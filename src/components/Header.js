import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const getDashboardLink = () => {
    if (user && user.role === 'admin') {
      return '/admin-dashboard';
    }
    return '/public-dashboard';
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Health Monitor</h1>
        </Link>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/project-topic">Health Topics</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to={getDashboardLink()}>Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register" className="btn btn-primary">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;