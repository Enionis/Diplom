import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!email || !password) {
        window.alert('Заполните все поля');
        return;
      }
    } else {
      if (!email || !username || !password || !name) {
        window.alert('Заполните все обязательные поля');
        return;
      }
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        window.alert('Логин должен быть 3-20 символов (буквы, цифры, _)');
        return;
      }
    }
    
    if (password.length < 6) {
      window.alert('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    if (!isLogin) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.alert('Введите корректный email');
        return;
      }
    }

    setIsLoading(true);
    try {
      const success = isLogin
        ? await login(email, password)
        : await register(email, username, password, name, birthDate || undefined);

      if (success) {
        window.alert(isLogin ? 'Вы вошли в аккаунт' : 'Аккаунт создан');
        navigate('/');
      } else {
        window.alert(isLogin ? 'Неверный логин или пароль' : 'Не удалось создать аккаунт');
      }
    } catch (_) {
      window.alert('Произошла ошибка. Попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <header
        className="gradient-header"
        style={{
          padding: '40px 20px',
          borderRadius: 30,
          textAlign: 'center',
        }}
      >
        <Sparkles size={40} color="var(--accent)" style={{ marginBottom: 20 }} />
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px' }}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>
          {isLogin ? 'Добро пожаловать обратно!' : 'Создайте свой аккаунт'}
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: '40px 0' }}>
        {!isLogin && (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                Имя *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Введите ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                Дата рождения
              </label>
              <input
                type="date"
                className="input-field"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            {isLogin ? 'Email или логин *' : 'Email *'}
          </label>
          <input
            type={isLogin ? 'text' : 'email'}
            className="input-field"
            placeholder={isLogin ? 'Email или логин' : 'example@mail.com'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {!isLogin && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Логин *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="3-20 символов (буквы, цифры, _)"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
        )}

        <div style={{ marginBottom: 20, position: 'relative' }}>
          <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            Пароль *
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="input-field"
            placeholder="Минимум 6 символов"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ paddingRight: 50 }}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 16,
              top: 42,
              padding: 4,
              color: '#666',
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          style={{ width: '100%', marginTop: 20, marginBottom: 20 }}
        >
          {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            width: '100%',
            padding: 10,
            background: 'none',
            color: 'var(--text-muted)',
            fontSize: 16,
          }}
        >
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </span>
        </button>
      </form>
    </div>
  );
}
