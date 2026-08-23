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
import DashboardPage from '@/pages/dashboard';

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
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
