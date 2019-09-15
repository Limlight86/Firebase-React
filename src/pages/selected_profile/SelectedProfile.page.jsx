import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { database } from "../../firebase";
import { GlobalContext } from "../../context";
import { SectionWrapper, ProfileContent, Comments } from "../../components";

const SelectedProfile = ({ match }) => {
  const [selectedProfile, setSeletectedProfile] = useState(null);
  const [comments, setComments] = useState([])
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

  const subscribeComments = () => {
    database
    .ref(`/comments/${profileId}`)
    .on('value', snapshot => {
      const comments = snapshot.val() || {}
      const parsedComments = Object.values(comments)
      setComments(parsedComments)
    })
  }

  useEffect(()=>{
    fetchSelectedProfile();
    subscribeComments();
  }, [])

  return(
    <SectionWrapper>
      {selectedProfile && <ProfileContent {...selectedProfile} /> }
      <div className='comments-container'>
        <h3>Comments</h3>
        <Comments comments={comments} handleSubmit={()=> console.log('adding a comment')} />
      </div>
    </SectionWrapper>
  ) 
};

export default withRouter(SelectedProfile);
