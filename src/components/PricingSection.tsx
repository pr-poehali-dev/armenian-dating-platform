import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  icon: string;
  gradient: string;
  planId?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Бесплатный',
    price: 0,
    period: 'навсегда',
    icon: 'Heart',
    gradient: 'from-gray-400 to-gray-600',
    features: [
      '5 лайков в день',
      'Базовый поиск',
      'Просмотр профилей',
      'Участие в событиях',
      'Чаты с взаимными лайками'
    ]
  },
  {
    name: 'Премиум',
    price: 999,
    period: 'месяц',
    popular: true,
    icon: 'Star',
    gradient: 'from-red-500 to-orange-500',
    planId: 'premium',
    features: [
      'Безлимитные лайки',
      'Расширенный поиск по интересам',
      'Видеозвонки в чатах',
      'Приоритет в показах',
      'Просмотр кто лайкнул вас',
      'Скрытие онлайн-статуса',
      'Без рекламы',
      'Значок Premium в профиле'
    ]
  },
  {
    name: 'VIP',
    price: 2499,
    period: 'месяц',
    icon: 'Crown',
    gradient: 'from-orange-500 to-yellow-500',
    planId: 'vip',
    features: [
      'Всё из Премиум +',
      'Персональный менеджер',
      'Проверка профилей собеседников',
      'Организация личных встреч',
      'Эксклюзивные VIP-события',
      'Профессиональная фотосессия',
      'Консультация психолога',
      'Гарантия конфиденциальности'
    ]
  }
];

export const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (planId: string) => {
    if (!email) {
      alert('Пожалуйста, укажите email для чека');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('https://functions.poehali.dev/4cdfd6e9-951e-41cf-8fee-dd431e4d128e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan: planId,
          email: email
        })
      });

      const data = await response.json();

      if (response.ok && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert(data.error || 'Ошибка создания платежа');
      }
    } catch (error) {
      alert('Ошибка соединения с сервером');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Выберите свой тариф
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Найдите идеального партнёра быстрее с премиум-функциями
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {pricingPlans.map((plan, index) => (
          <Card 
            key={plan.name}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
              plan.popular ? 'ring-4 ring-red-500 scale-105' : ''
            } animate-scale-in bg-white`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-bl-lg rounded-tr-lg bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2">
                  Популярный
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8 pt-10">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                <Icon name={plan.icon as any} size={40} className="text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <div className="text-center">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-2xl text-gray-600"> ₽</span>
                <p className="text-gray-500 mt-1">/ {plan.period}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon 
                      name="CheckCircle" 
                      size={20} 
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-red-500' : 'text-green-500'
                      }`}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.price === 0 ? (
                <Button 
                  className="w-full h-12 text-lg font-semibold bg-gray-600 hover:bg-gray-700"
                  disabled
                >
                  Текущий тариф
                </Button>
              ) : selectedPlan === plan.planId ? (
                <div className="space-y-3">
                  <Input 
                    type="email"
                    placeholder="Ваш email для чека"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                  <div className="flex gap-2">
                    <Button 
                      className={`flex-1 h-12 text-lg font-semibold ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90' 
                          : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90'
                      }`}
                      onClick={() => handlePayment(plan.planId!)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Обработка...' : 'Оплатить'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="h-12"
                      onClick={() => setSelectedPlan(null)}
                      disabled={isProcessing}
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  className={`w-full h-12 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90' 
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90'
                  }`}
                  onClick={() => setSelectedPlan(plan.planId!)}
                >
                  Выбрать тариф
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Гарантия безопасности</h3>
                <p className="text-gray-700">
                  Все платежи защищены банковским шифрованием. Можете отменить подписку в любой момент.
                  Возврат средств в течение 7 дней, если не нашли того, кто вам нравится.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-bold mb-1">Безопасные платежи</h4>
              <p className="text-sm text-gray-600">Visa, MasterCard, МИР, Apple Pay</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">✨</div>
              <h4 className="font-bold mb-1">Без автопродления</h4>
              <p className="text-sm text-gray-600">Полный контроль подписки</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">💝</div>
              <h4 className="font-bold mb-1">Гарантия результата</h4>
              <p className="text-sm text-gray-600">Или вернём деньги</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <a 
            href="/about" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
          >
            <Icon name="FileText" size={20} />
            Реквизиты и контакты организации
          </a>
        </div>
      </div>
    </div>
  );
};