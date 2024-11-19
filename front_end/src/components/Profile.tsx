import React, { useEffect, useState } from 'react';
import '../../../front_end/src/styles/Profile.css';
// import { FaUserCircle } from 'react-icons/fa';

interface ProfileProps {
  username: string;
  password: string;
  membership: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const loggedInUsername = localStorage.getItem('username') || 'admin';


  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Logged-in username:', loggedInUsername); // Log for debugging
  
      if (!loggedInUsername) {
        console.error('No logged-in user found');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:6969/users/${loggedInUsername}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, [loggedInUsername]);
  

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-icon">
        {/* <FaUserCircle size={80} style={{ color: '#555' }} /> */}
      </div>
      <div className="profile-header">Profil</div>
      <div className="profile-item">
        <span className="profile-label">Brukernavn:</span>
        <div className="profile-value">{profile.username}</div>
      </div>
      <div className="profile-item">
        <span className="profile-label">Passord:</span>
        <div className="profile-value">{profile.password}</div>
      </div>
      <div className="profile-item">
        <span className="profile-label">Medlemskap:</span>
        <div className="profile-value">{profile.membership || "Gratis"}</div>
      </div>
    </div>
  );
};

export default Profile;
