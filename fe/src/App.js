import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import RoommateSearch from './pages/RoommateSearch';
import BuildingSearch from './pages/BuildingSearch';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import UserOnboarding from './pages/UserOnboarding';
import { useState, useEffect } from 'react';
import ProfileView from './pages/ProfileView';
import ListerOnboarding from './pages/ListerOnboarding';
import ListerProfile from './pages/ListerProfile';
import ListerDashboard from './pages/ListerDashboard';
import ListerListings from './pages/ListerListings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import BuildingDetails from './pages/BuildingDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';


const saveSessionData = (key, value) => {
  if (value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

const getSessionData = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const getDefaultPath = (role) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'lister':
      return '/dashboard';
    default:
      return '/dashboard';
  }
};

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const currentPath = getSessionData('currentPath');
    if (isAuthenticated && user?.role && currentPath !== location.pathname) {
      saveSessionData('userRole', user.role);
      saveSessionData('currentPath', location.pathname);
    }
  }, [isAuthenticated, user, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  const storedRole = getSessionData('userRole') || user?.role || 'guest';
  const storedPath = getSessionData('currentPath') || getDefaultPath(storedRole);


  if (adminOnly && storedRole === 'admin') {
    return children;
  }

  if (adminOnly) {
    return <Navigate to="/dashboard" />;
  }

  if (storedRole === 'admin' && storedPath.startsWith('/admin')) {
    return <Navigate to={storedPath} />;
  }

  return children;
};


// Onboarding Route Component
const OnboardingRoute = ({ children, userType }) => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Check if user is trying to access the correct onboarding type
  if (user?.role !== userType) {
    return <Navigate to={user?.role === 'lister' ? "/lister-onboarding" : "/onboarding"} />;
  }

  // If user has already completed onboarding, redirect to dashboard
  if (user?.hasCompletedOnboarding) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      saveSessionData('userRole', user.role);
      saveSessionData('currentPath', location.pathname);
    }
  }, [isAuthenticated, user, location]);

  const showNavbar = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={
  isAuthenticated ? 
  <Navigate to={getSessionData('currentPath') || getDefaultPath(user?.role)} /> 
  : <SignIn />
} />

        <Route path="/signup" element={<SignUp />} />
        
        {/* Public search routes */}
        <Route path="/roommate-search" element={<RoommateSearch />} />
        <Route path="/building-search" element={<BuildingSearch />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        
        {/* User Onboarding route */}
        <Route path="/onboarding" element={
          <OnboardingRoute userType="user">
            <UserOnboarding />
          </OnboardingRoute>
        } />

        {/* Lister Onboarding route */}
        <Route path="/lister-onboarding" element={
          <OnboardingRoute userType="lister">
            <ListerOnboarding />
          </OnboardingRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {user?.role === 'lister' ? <ListerDashboard /> : <Dashboard />}
          </ProtectedRoute>
        } />

        {/* User Profile route */}
        <Route path="/profile" element={
          <ProtectedRoute>
            {user?.role === 'lister' ? <ListerProfile /> : <UserProfile />}
          </ProtectedRoute>
        } />

        {/* Lister-specific routes */}
        <Route path="/listings" element={
          <ProtectedRoute>
            {user?.role === 'lister' ? <ListerListings /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        } />

        {/* Add this new route */}
        <Route path="/listings/new" element={
          <ProtectedRoute>
            {user?.role === 'lister' ? <CreateListing /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        } />

        <Route path="/listings/:listingId/edit" element={
          <ProtectedRoute>
            {user?.role === 'lister' ? <EditListing /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        } />

        {/* Add this new route */}
        <Route path="/building/:id" element={<BuildingDetails />} />

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute adminOnly={true}>
            <AdminProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
