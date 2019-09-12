import React from 'react';
import classNames from 'classnames';

export default ({
  profile = {},
  selectedProfile,
  handleProfileClick,
  handleViewProfile
}) => {
  const { uid, displayName, tagline, photoURL, occupation } = profile;
  const isSelected = uid === selectedProfile.uid;
  return (
    <div className={classNames('profile', { 'selected-profile': isSelected })} onClick={handleProfileClick(profile)}>
      <img className="profile-img" src={photoURL} alt="profile" />
      <h3>
        {displayName} - {occupation}
      </h3>
      <p>{tagline}</p>
      {isSelected && <button onClick={handleViewProfile}>View Profile</button>}
    </div>
  );
};
