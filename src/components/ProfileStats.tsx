import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  gradient: string;
  premium?: boolean;
}

const StatsCard = ({ icon, label, value, gradient, premium }: StatsCardProps) => (
  <Card className={`relative overflow-hidden hover:shadow-lg transition-all ${premium ? 'ring-2 ring-red-400' : ''}`}>
    <CardContent className="p-6">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <Icon name={icon as any} size={24} className="text-gray-600" />
          {premium && (
            <Badge className="bg-gradient-primary text-white text-xs">
              Premium
            </Badge>
          )}
        </div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </CardContent>
  </Card>
);

interface ProfileStatsProps {
  isPremium: boolean;
}

export const ProfileStats = ({ isPremium }: ProfileStatsProps) => {
  const basicStats = [
    { icon: 'Eye', label: 'Просмотров профиля', value: 142, gradient: 'from-blue-400 to-blue-600' },
    { icon: 'Heart', label: 'Получено лайков', value: 38, gradient: 'from-red-400 to-orange-600' },
    { icon: 'Users', label: 'Взаимных симпатий', value: 5, gradient: 'from-green-400 to-emerald-600' },
    { icon: 'MessageCircle', label: 'Активных чатов', value: 8, gradient: 'from-blue-400 to-indigo-600' }
  ];

  const premiumStats = [
    { icon: 'TrendingUp', label: 'Рост популярности', value: '+24%', gradient: 'from-orange-400 to-red-600', premium: true },
    { icon: 'Clock', label: 'Среднее время ответа', value: '12 мин', gradient: 'from-teal-400 to-cyan-600', premium: true },
    { icon: 'Star', label: 'Рейтинг профиля', value: '4.8/5', gradient: 'from-yellow-400 to-orange-600', premium: true },
    { icon: 'Target', label: 'Совпадений по интересам', value: 23, gradient: 'from-orange-400 to-rose-600', premium: true }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">📊 Статистика профиля</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {basicStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {isPremium ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Crown" className="text-yellow-500" size={24} />
            <h3 className="text-xl font-bold">Премиум-аналитика</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {premiumStats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <Card className="mt-6 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Рекомендации для вас</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Добавьте больше фото — профили с 5+ фото получают на 40% больше лайков</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Обновите раздел "О себе" — расскажите о ваших традициях и семейных ценностях</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Участвуйте в событиях — 68% пар познакомились на армянских вечерах</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300">
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BarChart3" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">Расширенная аналитика</h4>
              <p className="text-gray-700 mb-4">
                Узнайте кто смотрел ваш профиль, получите персональные рекомендации и отслеживайте рост популярности
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="p-3 bg-white/50 rounded-lg">
                  <Icon name="Eye" className="mx-auto mb-1 text-blue-500" size={20} />
                  <p className="font-semibold">Кто смотрел профиль</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <Icon name="TrendingUp" className="mx-auto mb-1 text-green-500" size={20} />
                  <p className="font-semibold">График популярности</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <Icon name="Target" className="mx-auto mb-1 text-orange-500" size={20} />
                  <p className="font-semibold">Совместимость</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <Icon name="Lightbulb" className="mx-auto mb-1 text-red-500" size={20} />
                  <p className="font-semibold">Рекомендации</p>
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                🔒 Доступно только в Premium
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};