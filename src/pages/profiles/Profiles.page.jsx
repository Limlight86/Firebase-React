import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import { database } from "../../firebase";
import { SectionWrapper, Profile } from "../../components";

const Profiles = ({ history }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(String());

  const subscribeToProfiles = () => {
    database.ref("/profiles").on("value", snapshot => {
      const profiles = snapshot.val();
      const parsedProfiles = Object.values(profiles);
      setProfiles(parsedProfiles);
    });
  };

  const handleProfileClick = (id) => () => setSelectedProfileId(id)
  const handleViewProfile = () => history.push(`/selected-profile/${selectedProfileId}`)

  useEffect(() => {
    subscribeToProfiles();
  }, []);

  return (
    <SectionWrapper>
      <h2>Select a Proifle to View</h2>
      <ul>
        {profiles.map(profile => (
          <Profile
            key={profile.id}
            {...profile}
            handleProfileClick={handleProfileClick}
            handleViewProfile={handleViewProfile}
            selectedProfileId={selectedProfileId}
          />
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default withRouter(Profiles)