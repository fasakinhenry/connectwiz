import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/hooks/use-theme';
import { AuthProvider } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/components/routing/protected-route';
import LandingPage from '@/pages/landing';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import OAuthCallbackPage from '@/pages/auth/oauth-callback';
import OnboardingPage from '@/pages/onboarding';
import DashboardLayout from '@/pages/dashboard';
import FeedPage from '@/pages/feed';
import SearchPage from '@/pages/search';
import MessagesPage from '@/pages/messages';
import ActivityPage from '@/pages/activity';
import CommunitiesPage from '@/pages/communities';
import EventsPage from '@/pages/events';
import ProfilePage from '@/pages/profile';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <OnboardingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<FeedPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="messages/:personId" element={<MessagesPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="communities" element={<CommunitiesPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="people/:personId" element={<ProfilePage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
