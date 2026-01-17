import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-orange-50">
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">О проекте "Армянские Сердца"</h1>
          <p className="text-lg text-white/90">Платформа знакомств для армянской диаспоры России</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Building2" size={28} className="text-red-600" />
              Реквизиты организации
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Наименование</p>
                  <p className="font-semibold">ООО "Армянские Сердца"</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">ИНН</p>
                  <p className="font-semibold">7707123456</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">ОГРН</p>
                  <p className="font-semibold">1234567890123</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">КПП</p>
                  <p className="font-semibold">770701001</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-1">Юридический адрес</p>
                <p className="font-semibold">г. Москва, ул. Тверская, д. 1, офис 100, 125009</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-1">Адрес сайта</p>
                <p className="font-semibold">
                  <a 
                    href={window.location.origin} 
                    className="text-red-600 hover:text-red-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.location.origin}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Mail" size={28} className="text-red-600" />
              Контактная информация
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Телефон поддержки</p>
                  <p className="font-semibold text-lg">+7 (495) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email для связи</p>
                  <p className="font-semibold text-lg">info@armenianhearts.ru</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telegram поддержка</p>
                  <p className="font-semibold text-lg">@armenian_hearts_support</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Shield" size={28} className="text-red-600" />
              Безопасность и конфиденциальность
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Политика конфиденциальности:</strong> Мы защищаем ваши персональные данные в соответствии 
                с ФЗ-152 "О персональных данных".
              </p>
              <p>
                <strong>Обработка платежей:</strong> Все платежи обрабатываются через защищённый сервис ЮKassa. 
                Мы не храним данные ваших банковских карт.
              </p>
              <p>
                <strong>Возврат средств:</strong> Возможен в течение 7 дней с момента оплаты при отсутствии 
                использования премиум-функций.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300">
          <CardContent className="p-6 text-center">
            <Icon name="Heart" className="text-red-500 fill-current mx-auto mb-3" size={40} />
            <h3 className="text-xl font-bold mb-2">Мы помогаем армянам находить друг друга</h3>
            <p className="text-gray-700 mb-4">
              Наша миссия — объединять людей с общими культурными ценностями и традициями
            </p>
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Icon name="ArrowLeft" size={20} />
              Вернуться на главную
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;