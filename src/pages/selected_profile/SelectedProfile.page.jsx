import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { database } from "../../firebase";
import { GlobalContext } from "../../context";
import { SectionWrapper, ProfileContent, Comments } from "../../components";

const SelectedProfile = ({ match }) => {
  const [selectedProfile, setSeletectedProfile] = useState(null);
  const { profileId } = match.params || {};
  const fetchSelectedProfile = () => {
    database
    .ref('/profiles')
    .orderByChild('uid')
    .equalTo(profileId)
    .once('value', snapshot => {
      const selectedProfile = snapshot.val() || {}
      const parsedSelectedProfile = Object.values(selectedProfile)[0]
      setSeletectedProfile(parsedSelectedProfile)
    })
  }

  useEffect(()=>{
    fetchSelectedProfile()
  }, [])

  return(
    <SectionWrapper>
      {selectedProfile && <ProfileContent {...selectedProfile} /> }
      <Comments />
    </SectionWrapper>
  ) 
};

export default withRouter(SelectedProfile);
