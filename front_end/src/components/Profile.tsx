import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import '../../../front_end/src/styles/Profile.css';

interface ProfileProps {
  username: string;
  password: string;
  membership: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const loggedInUsername = localStorage.getItem('username') || 'admin';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
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
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-icon"></div>
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
        <button className="back-button" onClick={() => navigate(-1)}>Tilbake</button>
      </div>
    </Layout>
  );
};

export default Profile;
