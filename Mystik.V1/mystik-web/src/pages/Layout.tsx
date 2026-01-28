import { Outlet, NavLink } from 'react-router-dom';
import { Home, Star, User, Sparkles, BookOpen } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/tarot', icon: TarotIcon, label: 'Таро' },
  { to: '/horoscope', icon: Star, label: 'Эзотерика' },
  { to: '/tests', icon: BookOpen, label: 'Тесты' },
  { to: '/profile', icon: User, label: 'Профиль' },
];

function TarotIcon() {
  return <Sparkles size={24} />;
}

export default function Layout() {
  return (
    <div className="app-layout">
      <main className="app-content">
        <Outlet />
      </main>
      <nav className="nav-bottom">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={24} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
