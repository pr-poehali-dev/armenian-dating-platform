import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    city: '',
    gender: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    // Здесь будет логика регистрации
    window.location.href = '/';
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 my-8">
        <div className="text-center">
          <a href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-90 transition-opacity">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-3xl">
              ❤️
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Армянские Сердца
            </h1>
          </a>
          <p className="text-gray-600">Создайте профиль и начните знакомиться</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Регистрация</CardTitle>
            <p className="text-center text-gray-600">Заполните данные для создания профиля</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                  <Input 
                    type="text" 
                    placeholder="Например: Ани"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Пароль *</label>
                  <Input 
                    type="password" 
                    placeholder="Минимум 8 символов"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    minLength={8}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Повторите пароль *</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Ваш возраст *</label>
                  <Input 
                    type="number" 
                    placeholder="18+"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    required
                    min={18}
                    max={99}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Город *</label>
                  <Input 
                    type="text" 
                    placeholder="Например: Москва"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Пол *</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={formData.gender === 'male' ? 'default' : 'outline'}
                    className={`h-12 ${formData.gender === 'male' ? 'bg-gradient-primary' : ''}`}
                    onClick={() => handleChange('gender', 'male')}
                  >
                    <Icon name="User" size={20} className="mr-2" />
                    Мужчина
                  </Button>
                  <Button
                    type="button"
                    variant={formData.gender === 'female' ? 'default' : 'outline'}
                    className={`h-12 ${formData.gender === 'female' ? 'bg-gradient-primary' : ''}`}
                    onClick={() => handleChange('gender', 'female')}
                  >
                    <Icon name="User" size={20} className="mr-2" />
                    Женщина
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-gray-700">
                    После регистрации вы сможете добавить фото, указать интересы и начать знакомиться с людьми, разделяющими армянские традиции и культуру
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="w-4 h-4 mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Я согласен с{' '}
                  <a href="/about" className="text-red-600 hover:text-red-800 font-medium">
                    условиями использования
                  </a>
                  {' '}и{' '}
                  <a href="/about" className="text-red-600 hover:text-red-800 font-medium">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90"
              >
                <Icon name="Heart" size={20} className="mr-2" />
                Создать профиль
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">или зарегистрироваться через</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12">
                <svg className="w-5 h-5 mr-2" fill="#0088cc" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Telegram
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Уже есть аккаунт?{' '}
                <Link to="/login" className="text-red-600 hover:text-red-800 font-semibold">
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm font-semibold">Безопасно</p>
              <p className="text-xs text-gray-600">Проверка профилей</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">💝</div>
              <p className="text-sm font-semibold">2000+ пар</p>
              <p className="text-xs text-gray-600">Уже нашли друг друга</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-sm font-semibold">События</p>
              <p className="text-xs text-gray-600">Встречи вживую</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
