import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ProfilesTabProps {
  mockProfiles: Profile[];
  isPremium: boolean;
  dailyLikesLeft: number;
  likedProfiles: number[];
  onPremiumClick: () => void;
  onLike: (profileId: number) => void;
  onMessageClick: (profile: Profile) => void;
}

export const ProfilesTab = ({ 
  mockProfiles, 
  isPremium, 
  dailyLikesLeft, 
  likedProfiles, 
  onPremiumClick, 
  onLike,
  onMessageClick
}: ProfilesTabProps) => {
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');

  const filteredProfiles = mockProfiles.filter(profile => {
    const ageMatch = (!ageFrom || profile.age >= parseInt(ageFrom)) && 
                     (!ageTo || profile.age <= parseInt(ageTo));
    const cityMatch = !cityFilter || profile.city.toLowerCase().includes(cityFilter.toLowerCase());
    const interestMatch = !interestFilter || 
                         profile.interests.some(i => i.toLowerCase().includes(interestFilter.toLowerCase()));
    return ageMatch && cityMatch && (isPremium ? interestMatch : true);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {!isPremium && (
        <Card className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Heart" className="text-red-500 fill-current" size={24} />
              <div>
                <p className="font-semibold">Осталось лайков сегодня: {dailyLikesLeft}/5</p>
                <p className="text-sm text-gray-600">Премиум = безлимитные лайки</p>
              </div>
            </div>
            <Button className="bg-gradient-primary" onClick={onPremiumClick}>
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
                <Input 
                  placeholder="От" 
                  type="number" 
                  value={ageFrom}
                  onChange={(e) => setAgeFrom(e.target.value)}
                />
                <Input 
                  placeholder="До" 
                  type="number"
                  value={ageTo}
                  onChange={(e) => setAgeTo(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Город</label>
              <Input 
                placeholder="Москва, Санкт-Петербург..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Интересы</label>
              <Input 
                placeholder="Культура, спорт..." 
                disabled={!isPremium}
                value={interestFilter}
                onChange={(e) => setInterestFilter(e.target.value)}
              />
            </div>
          </div>
          {!isPremium && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              🔒 Расширенный поиск по интересам, образованию и традициям доступен в Premium
            </p>
          )}
        </CardContent>
      </Card>

      {filteredProfiles.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Никого не найдено</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile, index) => (
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
                  onClick={() => onLike(profile.id)}
                >
                  <Icon name={likedProfiles.includes(profile.id) ? "Heart" : "Heart"} size={18} className={likedProfiles.includes(profile.id) ? "fill-current" : ""} />
                  {likedProfiles.includes(profile.id) ? 'Нравится' : 'Лайк'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onMessageClick(profile)}
                >
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
    </div>
  );
};