import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [UserInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin profile data from the database
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setUserInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ap'>
         <div className="user-profile2">
      {adminInfo ? (
        <>
          <h2>Admin Profile</h2>
          <div className="user-profile__info">
            <div>
              <strong>User ID:</strong> {adminInfo.adminId}
            </div>
            <div>
              <strong>Name:</strong> {adminInfo.name}
            </div>
            <div>
              <strong>Email:</strong> {adminInfo.email}
            </div>
          </div>
        </>
      ) : (
        <div>No profile data available</div>
      )}
    </div>
    </div>
   
  );
}

export default UserProfile;