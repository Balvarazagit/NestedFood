import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error('Invalid user data:', err);
      }
    }
  }, [location]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand position-absolute start-50 translate-middle-x" to="/">
            Nested Food Admin
          </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="adminNavbar">
          <ul className="navbar-nav">


            <li className="nav-item dropdown">
              <a
            
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.name || 'Profile'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {user ? (
                  <>
                    <li className="px-3 py-1 text-muted small">
                      <strong>{user.name}</strong><br />
                      <span>{user.email}</span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                ) : (
                  <li className="dropdown-item text-muted">No user info</li>
                )}
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
