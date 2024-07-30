import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SideNavBar from './components/common/SideNavbar';
import Mobile from './components/common/MobileNavBar';
import ClubDashboard from './pages/ClubDashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import Events from './pages/EventPage';
import OrganizationPage from './pages/OrganizationPage';
import UserNavigation from './components/common/ProfileNavbar';
import PrivateRoute from './services/privateRoute';
import ClubRegistration from './components/Resources/Forms/ClubRegistration';
import ClubRenewal from './components/Resources/Forms/ClubRenewal';
import { AuthProvider, useAuth } from './services/authContext';
import Allocation from './components/ClubDashboard/Finance/AllocationForm';
import Expenditure from './components/ClubDashboard/Finance/ExpenditureForm';
import FinancePage from './pages/FinancePage';
import AllocationForm from './components/ClubDashboard/Finance/AllocationForm';
import ExpenditureForm from './components/ClubDashboard/Finance/ExpenditureForm';
import PrintingForm from './components/ClubDashboard/Finance/PrintingForm';
import ClubPage from './components/Organizations/club-page/ClubPage';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const shouldShowNavBar = location.pathname !== '/' && location.pathname !== '/signup' && isAuthenticated;

  return (
    <div className="App">
      {shouldShowNavBar && <UserNavigation />}
      {shouldShowNavBar && <SideNavBar />}
      {/* checks view port to be sm */}
      {shouldShowNavBar && <Mobile />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<PrivateRoute element={Events} />} />
        <Route path="/clubdashboard" element={<PrivateRoute element={ClubDashboard} />} />
        <Route path="/resources" element={<PrivateRoute element={ResourcesPage} />} />
        <Route path="/resources/clubregistration" element={<PrivateRoute element={ClubRegistration} />} />
        <Route path="/resources/clubrenewal" element={<PrivateRoute element={ClubRenewal} />} />
        <Route path="/finance/AllocationForm" element={<PrivateRoute element={Allocation} />} />
        <Route path="/finance/ExpenditureForm" element={<PrivateRoute element={Expenditure} />} />
        <Route path="/organization" element={<PrivateRoute element={OrganizationPage} />} />
        <Route path="/organization/:clubName" element={<PrivateRoute element={ClubPage} />} />
        <Route path="/clubdashboard/finance" element={<PrivateRoute element={FinancePage} />} />
        <Route path="/clubdashboard/finance/allocation" element={<PrivateRoute element={AllocationForm} />} />
        <Route path="/clubdashboard/finance/expenditure" element={<PrivateRoute element={ExpenditureForm} />} />
        <Route path="/clubdashboard/finance/printing" element={<PrivateRoute element={PrintingForm} />} />
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