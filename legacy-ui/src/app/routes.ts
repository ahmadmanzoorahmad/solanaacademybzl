import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { CourseCatalog } from './pages/CourseCatalog';
import { CourseDetail } from './pages/CourseDetail';
import { LessonView } from './pages/LessonView';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { CertificateView } from './pages/CertificateView';
import { DigitalIdentity } from './pages/DigitalIdentity';
import { CredentialVerification } from './pages/CredentialVerification';
import { CodeChallenge } from './pages/CodeChallenge';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'courses', Component: CourseCatalog },
      { path: 'courses/:slug', Component: CourseDetail },
      { path: 'courses/:slug/lessons/:lessonId', Component: LessonView },
      { path: 'challenges/:id', Component: CodeChallenge },
      { path: 'dashboard', Component: Dashboard },
      { path: 'identity', Component: DigitalIdentity },
      { path: 'verify/:mint', Component: CredentialVerification },
      { path: 'profile/:username?', Component: Profile },
      { path: 'leaderboard', Component: Leaderboard },
      { path: 'settings', Component: Settings },
      { path: 'certificates/:id', Component: CertificateView },
      { path: '*', Component: NotFound },
    ],
  },
]);