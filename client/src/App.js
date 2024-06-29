import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../src/components/auth/SignIn.js';
import SignUp from '../src/components/auth/SignUp.js';
import SideNavBar from '../src/components/common/SideNavbar.js';
import ClubDashboard from '../src/pages/ClubDashboardPage.js';
import ResourcesPage from '../src/pages/ResourcesPage.js';
import Events from '../src/pages/EventPage.js';
import OrganizationPage from './pages/OrganizationPage.js';

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== '/' && location.pathname !== '/signup';

  return (
    <div className="App">
      {shouldShowNavBar && <SideNavBar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubdashboard" element={<ClubDashboard />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
