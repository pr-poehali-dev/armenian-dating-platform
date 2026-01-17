import json
import os
import uuid
import base64
import requests

def handler(event: dict, context) -> dict:
    '''API для создания платежей через ЮKassa'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            plan = body.get('plan')
            user_email = body.get('email', 'user@example.com')

            price_map = {
                'premium': {'amount': '999.00', 'description': 'Подписка Premium на 1 месяц'},
                'vip': {'amount': '2499.00', 'description': 'Подписка VIP на 1 месяц'}
            }

            if plan not in price_map:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный тариф'}),
                    'isBase64Encoded': False
                }

            shop_id = os.environ.get('YUKASSA_SHOP_ID', '')
            secret_key = os.environ.get('YUKASSA_SECRET_KEY', '')

            if not shop_id or not secret_key:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Платёжные ключи не настроены. Добавьте YUKASSA_SHOP_ID и YUKASSA_SECRET_KEY в секреты проекта.'}),
                    'isBase64Encoded': False
                }

            idempotence_key = str(uuid.uuid4())
            payment_data = {
                'amount': {
                    'value': price_map[plan]['amount'],
                    'currency': 'RUB'
                },
                'confirmation': {
                    'type': 'redirect',
                    'return_url': f'{event.get("headers", {}).get("origin", "https://localhost")}/payment-success'
                },
                'capture': True,
                'description': price_map[plan]['description'],
                'metadata': {
                    'user_email': user_email,
                    'plan': plan
                }
            }

            auth_string = f'{shop_id}:{secret_key}'
            auth_header = base64.b64encode(auth_string.encode()).decode()

            response = requests.post(
                'https://api.yookassa.ru/v3/payments',
                json=payment_data,
                headers={
                    'Authorization': f'Basic {auth_header}',
                    'Idempotence-Key': idempotence_key,
                    'Content-Type': 'application/json'
                },
                timeout=10
            )

            if response.status_code == 200:
                payment_info = response.json()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'payment_url': payment_info['confirmation']['confirmation_url'],
                        'payment_id': payment_info['id']
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'error': 'Ошибка создания платежа',
                        'details': response.text
                    }),
                    'isBase64Encoded': False
                }

        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }

    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
