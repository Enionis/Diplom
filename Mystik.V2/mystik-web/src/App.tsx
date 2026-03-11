import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import { SettingsProvider } from './providers/SettingsProvider';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Tarot from './pages/Tarot';
import Horoscope from './pages/Horoscope';
import Tests from './pages/Tests';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Subscription from './pages/Subscription';
import Quiz from './pages/Quiz';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  }
  
  if (!user || user.isGuest) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  }

  return (
    <SettingsProvider>
      <Routes>
        <Route path="/auth" element={user && !user.isGuest ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="tarot" element={<Tarot />} />
          <Route path="horoscope" element={<Horoscope />} />
          <Route path="horoscope/matrix" element={<Horoscope tab="matrix" />} />
          <Route path="tests" element={<Tests />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SettingsProvider>
  );
}
