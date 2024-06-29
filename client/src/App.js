import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SideNavBar from './components/common/SideNavbar';
import ClubDashboard from './pages/ClubDashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import Events from './pages/EventPage';
import OrganizationPage from './pages/OrganizationPage';
import UserNavigation from './components/common/ProfileNavbar';
import PrivateRoute from './services/privateRoute';
import { AuthProvider, useAuth } from './services/authContext';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const shouldShowNavBar = location.pathname !== '/' && location.pathname !== '/signup' && isAuthenticated;

  return (
    <div className="App">
      {shouldShowNavBar && <UserNavigation />}
      {shouldShowNavBar && <SideNavBar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<PrivateRoute element={Events} />} />
        <Route path="/clubdashboard" element={<PrivateRoute element={ClubDashboard} />} />
        <Route path="/resources" element={<PrivateRoute element={ResourcesPage} />} />
        <Route path="/organization" element={<PrivateRoute element={OrganizationPage} />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}