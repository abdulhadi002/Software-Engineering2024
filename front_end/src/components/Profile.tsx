import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { ProfileData } from '../components/Types';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/profile');
        if (response.ok) {
          const data: ProfileData = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-section">
    <h2>Profil</h2>
    <div className="profile-info">
        <div className="info-item">
        <span className="label">Brukernavn:</span>
        <span className="value">{profileData.username}</span>
        </div>
        <div className="info-item">
        <span className="label">Passord:</span>
        <span className="value">******</span>
        </div>
        <div className="info-item">
        <span className="label">Medlemskap:</span>
        <span className="value">{profileData.membership}</span>
        </div>
    </div>
    </div>
  );
};

export default Profile;
