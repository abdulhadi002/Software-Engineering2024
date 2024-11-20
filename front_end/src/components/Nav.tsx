import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Nav.css';

type NavProps = {
  onLogout: () => void;
};

const Nav: React.FC<NavProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('token'); 

    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <button className="logout-button" onClick={handleLogout}>
        Logg ut
      </button>
      <nav className="navbar">
        <div className="center-box">BLUE-BOOTH</div>
        <ul className="right-icons">
          <li id="icon-1">
            <Link to="#bluetooth">
              <i className="fab fa-bluetooth-b"></i>
            </Link>
          </li>
          <li id="icon-2">
            <Link to="/profile">
              <i className="fas fa-user"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
