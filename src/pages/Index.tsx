import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { PricingSection } from '@/components/PricingSection';
import { ProfileStats } from '@/components/ProfileStats';

interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  image: string;
  interests: string[];
  verified: boolean;
  online: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Ани',
    age: 25,
    city: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/becc0a67-f42d-4c9d-87aa-7f3ccb4ddd96.jpg',
    interests: ['Культура', 'Танцы', 'Путешествия'],
    verified: true,
    online: true
  },
  {
    id: 2,
    name: 'Арам',
    age: 28,
    city: 'Санкт-Петербург',
    image: 'https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/f96887e9-1d29-4834-9ed5-fb20436f9bec.jpg',
    interests: ['Музыка', 'Спорт', 'Кулинария'],
    verified: true,
    online: false
  },
  {
    id: 3,
    name: 'Мария',
    age: 26,
    city: 'Москва',
    image: 'https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/0185816e-d146-4719-9a06-5e71d73b9c23.jpg',
    interests: ['Искусство', 'Книги', 'Йога'],
    verified: true,
    online: true
  },
  {
    id: 4,
    name: 'Давид',
    age: 30,
    city: 'Краснодар',
    image: 'https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/f96887e9-1d29-4834-9ed5-fb20436f9bec.jpg',
    interests: ['Бизнес', 'Технологии', 'Фотография'],
    verified: false,
    online: true
  }
];

const mockEvents = [
  { id: 1, title: 'Армянский вечер в Москве', date: '25 января', participants: 42, image: '🎭' },
  { id: 2, title: 'Встреча в кафе "Арарат"', date: '28 января', participants: 18, image: '☕' },
  { id: 3, title: 'Концерт традиционной музыки', date: '2 февраля', participants: 95, image: '🎵' }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [dailyLikesLeft, setDailyLikesLeft] = useState(5);

  const handleLike = (profileId: number) => {
    if (!isPremium && dailyLikesLeft <= 0) {
      alert('Лимит лайков исчерпан! Оформите Премиум для безлимитных лайков.');
      return;
    }
    
    setLikedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
    
    if (!isPremium && !likedProfiles.includes(profileId)) {
      setDailyLikesLeft(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                ❤️
              </div>
              <h1 className="text-2xl font-bold">Армянские Сердца</h1>
            </div>
            <div className="flex items-center gap-4">
              {!isPremium && (
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
                  onClick={() => setActiveTab('premium')}
                >
                  <Icon name="Star" size={18} className="mr-2" />
                  Premium
                </Button>
              )}
              {isPremium && (
                <Badge className="bg-yellow-500 text-white px-3 py-1">
                  <Icon name="Crown" size={16} className="mr-1" />
                  Premium
                </Badge>
              )}
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarImage src="https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/becc0a67-f42d-4c9d-87aa-7f3ccb4ddd96.jpg" />
                <AvatarFallback>А</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Поиск</span>
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-2">
              <Icon name="Heart" size={16} />
              <span className="hidden sm:inline">Лайки</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">События</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Icon name="Users2" size={16} />
              <span className="hidden sm:inline">Лента</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Icon name="Star" size={16} />
              <span className="hidden sm:inline">Premium</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="space-y-6 animate-fade-in">
            {!isPremium && (
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Heart" className="text-red-500 fill-current" size={24} />
                    <div>
                      <p className="font-semibold">Осталось лайков сегодня: {dailyLikesLeft}/5</p>
                      <p className="text-sm text-gray-600">Премиум = безлимитные лайки</p>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary" onClick={() => setActiveTab('premium')}>
                    Оформить Premium
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">🔍 Поиск по параметрам</h2>
                  {!isPremium && (
                    <Badge className="bg-gray-500">Базовый поиск</Badge>
                  )}
                  {isPremium && (
                    <Badge className="bg-gradient-primary text-white">
                      <Icon name="Star" size={14} className="mr-1" />
                      Расширенный поиск
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Возраст</label>
                    <div className="flex gap-2">
                      <Input placeholder="От" type="number" />
                      <Input placeholder="До" type="number" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Город</label>
                    <Input placeholder="Выберите город" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Интересы</label>
                    <Input placeholder="Культура, спорт..." disabled={!isPremium} />
                  </div>
                </div>
                {!isPremium && (
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    🔒 Расширенный поиск по интересам, образованию и традициям доступен в Premium
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProfiles.map((profile, index) => (
                <Card 
                  key={profile.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="w-full h-64 object-cover"
                    />
                    {profile.online && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Icon name="Circle" size={8} className="mr-1 fill-current" />
                          Онлайн
                        </Badge>
                      </div>
                    )}
                    {profile.verified && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-500 text-white">
                          <Icon name="BadgeCheck" size={14} className="mr-1" />
                          Проверен
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {profile.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                        onClick={() => handleLike(profile.id)}
                      >
                        <Icon name={likedProfiles.includes(profile.id) ? "Heart" : "Heart"} size={18} className={likedProfiles.includes(profile.id) ? "fill-current" : ""} />
                        {likedProfiles.includes(profile.id) ? 'Нравится' : 'Лайк'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="MessageCircle" size={18} />
                        Написать
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Video" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Heart" className="text-red-500 fill-current" />
                    Мои лайки ({likedProfiles.length})
                  </h3>
                  {likedProfiles.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Вы пока никого не лайкнули</p>
                  ) : (
                    <div className="space-y-3">
                      {mockProfiles.filter(p => likedProfiles.includes(p.id)).map(profile => (
                        <div key={profile.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-all">
                          <Avatar>
                            <AvatarImage src={profile.image} />
                            <AvatarFallback>{profile.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">{profile.name}, {profile.age}</p>
                            <p className="text-sm text-gray-600">{profile.city}</p>
                          </div>
                          <Button size="sm" className="bg-gradient-primary">
                            <Icon name="MessageCircle" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Users" className="text-green-500" />
                    Взаимные симпатии (2)
                  </h3>
                  <div className="space-y-3">
                    {[mockProfiles[0], mockProfiles[2]].map(profile => (
                      <div key={profile.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition-all">
                        <Avatar>
                          <AvatarImage src={profile.image} />
                          <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{profile.name}, {profile.age}</p>
                          <p className="text-sm text-gray-600">Тоже лайкнул(а) вас! 💚</p>
                        </div>
                        <Button size="sm" className="bg-gradient-secondary">
                          Начать общение
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">💬 Сообщения</h2>
                <div className="space-y-4">
                  {mockProfiles.slice(0, 3).map(profile => (
                    <div key={profile.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all">
                      <div className="relative">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={profile.image} />
                          <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        {profile.online && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{profile.name}</p>
                        <p className="text-sm text-gray-600">Привет! Как дела?</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">2 мин назад</p>
                        <Badge className="bg-gradient-primary mt-1">2</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="bg-gradient-secondary text-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold mb-2">🎉 События для знакомств</h2>
                  <p className="text-white/90">Встречайтесь вживую на культурных мероприятиях</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEvents.map(event => (
                  <Card key={event.id} className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center">{event.image}</div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Icon name="Users" size={16} />
                          {event.participants} участников
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-primary">
                        Участвовать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="animate-fade-in">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">📱 Лента сообщества</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-center">Поделитесь своими мыслями...</p>
                  </div>
                  
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={mockProfiles[i - 1]?.image} />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{mockProfiles[i - 1]?.name}</p>
                          <p className="text-xs text-gray-500">2 часа назад</p>
                        </div>
                      </div>
                      <p className="mb-3">Сегодня была на замечательном армянском концерте! Кто тоже был? 🎵</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <button className="flex items-center gap-1 hover:text-red-500">
                          <Icon name="Heart" size={16} />
                          24
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <Icon name="MessageCircle" size={16} />
                          8
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;