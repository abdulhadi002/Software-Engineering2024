// src/components/Footer.tsx
import React from 'react';
import '../styles/Footer.css'; // Ensure you have a Footer CSS file for styling

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 My Website. All Rights Reserved.</p>
                <ul className="footer-links">
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
