import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css'; // Ensure this path is correct

const Nav: React.FC = () => {
    return (
<header className="header">
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
