import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface HeaderSectionProps {
  isPremium: boolean;
  onPremiumClick: () => void;
}

export const HeaderSection = ({ isPremium, onPremiumClick }: HeaderSectionProps) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Пользователь';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAge');
    localStorage.removeItem('userCity');
    localStorage.removeItem('userGender');
    navigate('/login');
  };

  return (
    <div className="bg-gradient-primary text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              ❤️
            </div>
            <h1 className="text-2xl font-bold">Армянские Сердца</h1>
          </a>
          <div className="flex items-center gap-4">
            {!isPremium && (
              <Button 
                variant="secondary" 
                className="bg-white text-red-600 hover:bg-white/90 font-semibold"
                onClick={onPremiumClick}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-white/50 transition-all">
                  <AvatarImage src="https://cdn.poehali.dev/projects/4a1800f8-5b7e-45bd-b17d-3e7d22e4acca/files/becc0a67-f42d-4c9d-87aa-7f3ccb4ddd96.jpg" />
                  <AvatarFallback>{userName[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-xs text-gray-500">{localStorage.getItem('userEmail')}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};