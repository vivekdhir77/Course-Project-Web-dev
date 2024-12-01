import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTextColor = () => scrolled ? '#2563eb' : 'white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 h-[72px] ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <Link 
            to="/home" 
            className="text-2xl font-bold text-white transition-colors duration-300"
            style={{ color: getTextColor() }}
          >
            RoommateFinder
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              to="/home" 
              className="font-medium text-white transition-colors duration-300"
              style={{ color: getTextColor() }}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                ) : (
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                )}
                <Link 
                  to="/profile" 
                  className={`px-6 py-2.5 rounded-full font-medium transition-colors duration-300 text-white 
                    ${scrolled 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      : 'bg-white/10 hover:bg-white/20'
                    } border border-white/25`}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="font-medium text-white transition-colors duration-300"
                  style={{ color: getTextColor() }}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-6 py-2.5 rounded-full font-medium transition-colors duration-300 text-white 
                    ${scrolled 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      : 'bg-white/10 hover:bg-white/20'
                    } border border-white/25`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;