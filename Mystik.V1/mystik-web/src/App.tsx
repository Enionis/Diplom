import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Tarot from './pages/Tarot';
import Horoscope from './pages/Horoscope';
import Tests from './pages/Tests';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Subscription from './pages/Subscription';
import Quiz from './pages/Quiz';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tarot" element={<Tarot />} />
        <Route path="horoscope" element={<Horoscope />} />
        <Route path="horoscope/matrix" element={<Horoscope tab="matrix" />} />
        <Route path="tests" element={<Tests />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
