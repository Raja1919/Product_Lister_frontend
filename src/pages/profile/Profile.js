import React, { useState } from 'react';
import EditProfile from '../editProfile/EditProfile';
import "./Profile.css"

const Profile = ({ user }) => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit Profile';

    // Add a conditional check for user existence
    if (!user) {
        return <div>Loading...</div>; // or handle this case appropriately
    }

    return (
        <div className="profile">
            <h1>Hello {user.name}</h1>
            <p>Email: {user.email}</p>
            <button className="show-tab" onClick={() => { setShowTab(!showTab) }}>{buttonText}</button>
            {
                showTab &&
                <EditProfile user={user} />
            }
        </div>
    );
};

export default Profile;