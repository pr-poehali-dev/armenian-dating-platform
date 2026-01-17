import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { HeaderSection } from '@/components/HeaderSection';
import { ProfilesTab } from '@/components/ProfilesTab';
import { EventsCommunityTabs } from '@/components/EventsCommunityTabs';
import { ProfileSettingsTabs } from '@/components/ProfileSettingsTabs';

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profiles');
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [dailyLikesLeft, setDailyLikesLeft] = useState(5);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Если не авторизован, перенаправляем на страницу входа
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-orange-50">
      <HeaderSection 
        isPremium={isPremium} 
        onPremiumClick={() => setActiveTab('premium')} 
      />

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
            <TabsTrigger value="premium" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
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

          <TabsContent value="profiles">
            <ProfilesTab 
              mockProfiles={mockProfiles}
              isPremium={isPremium}
              dailyLikesLeft={dailyLikesLeft}
              likedProfiles={likedProfiles}
              onPremiumClick={() => setActiveTab('premium')}
              onLike={handleLike}
            />
          </TabsContent>

          <EventsCommunityTabs 
            mockProfiles={mockProfiles}
            mockEvents={mockEvents}
            likedProfiles={likedProfiles}
          />

          <ProfileSettingsTabs 
            isPremium={isPremium}
            setIsPremium={setIsPremium}
            setActiveTab={setActiveTab}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Index;