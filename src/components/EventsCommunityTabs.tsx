import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

interface EventsCommunityTabsProps {
  mockProfiles: Profile[];
  mockEvents: Array<{ id: number; title: string; date: string; participants: number; image: string }>;
  likedProfiles: number[];
}

export const EventsCommunityTabs = ({ mockProfiles, mockEvents, likedProfiles }: EventsCommunityTabsProps) => {
  return (
    <>
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
    </>
  );
};
