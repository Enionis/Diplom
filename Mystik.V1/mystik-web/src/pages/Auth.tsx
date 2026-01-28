import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert('Заполните все поля');
      return;
    }
    if (!isLogin && !name) {
      window.alert('Введите имя');
      return;
    }
    if (password.length < 6) {
      window.alert('Пароль должен содержать минимум 6 символов');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert('Введите корректный email');
      return;
    }

    setIsLoading(true);
    try {
      const success = isLogin
        ? await login(email, password)
        : await register(email, password, name);

      if (success) {
        window.alert(isLogin ? 'Вы вошли в аккаунт' : 'Аккаунт создан');
        navigate(-1);
      } else {
        window.alert(isLogin ? 'Неверный email или пароль' : 'Не удалось создать аккаунт');
      }
    } catch (_) {
      window.alert('Произошла ошибка. Попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 20,
          padding: 8,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={24} />
      </Link>

      <header
        className="gradient-header"
        style={{
          padding: '40px 20px',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
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
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Имя
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
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            Email
          </label>
          <input
            type="email"
            className="input-field"
            placeholder="example@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: 20, position: 'relative' }}>
          <label style={{ display: 'block', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            Пароль
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
