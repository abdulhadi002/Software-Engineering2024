import React from 'react';
import '../../../front_end/src/styles/Profile.css';
import { FaUserCircle } from 'react-icons/fa';

interface ProfileProps {
  username: string;
  password: string;
  membership: string;
}

const Profile: React.FC<ProfileProps> = ({ username, password, membership }) => {
  return (
    <div className="profile-container">
      <div className="profile-icon">
        <FaUserCircle size={80} style={{ color: '#333' }} />
      </div>
      <div className="profile-header">Profil</div>
      <div className="profile-item">
        <span className="profile-label">Brukernavn:</span>
        <div className="profile-value">{username}</div>
      </div>
      <div className="profile-item">
        <span className="profile-label">Passord:</span>
        <div className="profile-value">{password}</div>
      </div>
      <div className="profile-item">
        <span className="profile-label">Medlemskap:</span>
        <div className="profile-value">{membership || 'Gratis'}</div>
      </div>
    </div>
  );
};

export default Profile;
