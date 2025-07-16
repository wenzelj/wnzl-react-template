import React from 'react';

const ProfilePage = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="Profile" />
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
