import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsOfServicePage from './pages/TermsOfService';
import CookiePolicyPage from './pages/CookiePolicy';
import LicensesPage from './pages/Licenses';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import DashboardPage from './pages/Dashboard';
import ShowcasePage from './pages/Showcase';
import UserDesignsPage from './pages/UserDesigns';
import CustomizeFurniturePage from './pages/CustomizeFurniture';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/licenses" element={<LicensesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/my-designs" element={
            <ProtectedRoute>
              <UserDesignsPage />
            </ProtectedRoute>
          } />
          <Route path="/customize" element={
            <ProtectedRoute>
              <CustomizeFurniturePage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
