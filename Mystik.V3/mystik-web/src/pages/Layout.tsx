import { Outlet, NavLink } from 'react-router-dom';
import { Home, Star, User, Sparkles, BookOpen } from 'lucide-react';
import { useSettings } from '@/providers/SettingsProvider';

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
  const { menuPosition } = useSettings();

  return (
    <div className={`app-layout ${menuPosition === 'side' ? 'layout-side' : 'layout-bottom'}`}>
      {menuPosition === 'side' && (
        <nav className="nav-side">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              title={label}
            >
              <Icon size={24} />
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>
      )}
      
      <main className={`app-content ${menuPosition === 'side' ? 'content-with-sidebar' : ''}`}>
        <Outlet />
      </main>
      
      {menuPosition === 'bottom' && (
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
      )}
    </div>
  );
}
