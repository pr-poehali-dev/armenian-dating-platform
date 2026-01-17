import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ProfileStats } from '@/components/ProfileStats';
import { PricingSection } from '@/components/PricingSection';

interface ProfileSettingsTabsProps {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const ProfileSettingsTabs = ({ isPremium, setIsPremium, setActiveTab }: ProfileSettingsTabsProps) => {
  return (
    <>
      <TabsContent value="profile" className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/becc0a67-f42d-4c9d-87aa-7f3ccb4ddd96.jpg" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold mb-1">Ани, 25</h3>
              <p className="text-gray-600 mb-4">Москва</p>
              <Badge className="bg-blue-500 text-white mb-4">
                <Icon name="BadgeCheck" size={14} className="mr-1" />
                Профиль проверен
              </Badge>
              <Button className="w-full bg-gradient-primary">
                Редактировать профиль
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">О себе</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Интересы</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Культура', 'Танцы', 'Путешествия', 'Кулинария', 'Музыка'].map(interest => (
                      <Badge key={interest} className="bg-gradient-to-r from-purple-100 to-pink-100">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Описание</label>
                  <p className="mt-2 text-gray-700">
                    Люблю армянскую культуру, традиционные танцы и путешествия. Ищу человека для серьёзных отношений, который разделяет мои ценности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <ProfileStats isPremium={isPremium} />
        </div>
      </TabsContent>

      <TabsContent value="settings" className="animate-fade-in">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">⚙️ Настройки</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Приватность и безопасность</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium">Проверка профиля</p>
                      <p className="text-sm text-gray-600">Загрузите документ для верификации</p>
                    </div>
                    <Button size="sm" className="bg-gradient-primary">Пройти</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium">Видимость профиля</p>
                      <p className="text-sm text-gray-600">Кто может видеть ваш профиль</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Премиум функции</h3>
                {!isPremium ? (
                  <Card className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg">Премиум подписка</p>
                          <p className="text-sm text-gray-700">Расширенный поиск, безлимитные лайки, приоритет в показах</p>
                        </div>
                        <Button className="bg-gradient-primary" onClick={() => setActiveTab('premium')}>
                          Подключить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Crown" className="text-yellow-600" size={32} />
                          <div>
                            <p className="font-bold text-lg">Premium активен</p>
                            <p className="text-sm text-gray-700">Действует до 17 февраля 2026</p>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => setIsPremium(false)}>
                          Отменить (демо)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Уведомления</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <p className="font-medium">Новые сообщения</p>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <p className="font-medium">Новые лайки</p>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <p className="font-medium">События поблизости</p>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="premium" className="animate-fade-in">
        <PricingSection />
        
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg mt-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Попробуйте Premium прямо сейчас!</h3>
            <div className="max-w-md mx-auto space-y-4">
              <Button 
                className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90"
                onClick={() => {
                  setIsPremium(true);
                  setActiveTab('profiles');
                  alert('Добро пожаловать в Premium! Теперь у вас безлимитные лайки и расширенный поиск.');
                }}
              >
                <Icon name="Star" size={20} className="mr-2" />
                Активировать Premium (демо)
              </Button>
              <p className="text-center text-sm text-gray-500">
                Это демо-версия. В реальном приложении здесь будет платёжная форма.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
