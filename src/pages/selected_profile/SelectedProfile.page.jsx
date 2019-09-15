import React, { useState, useEffect, useContext, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { database } from "../../firebase";
import { GlobalContext } from "../../context";
import { SectionWrapper, ProfileContent, Comments } from "../../components";

const SelectedProfile = ({ match }) => {
  const [selectedProfile, setSeletectedProfile] = useState(null);
  const [comments, setComments] = useState([])
  const {globalState} = useContext(GlobalContext)
  const {currentUserProfile = {}} = globalState
  const { profileId } = match.params || {};
  const ref = `/comments/${profileId}`
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
    .ref(ref)
    .on('value', snapshot => {
      const comments = snapshot.val() || {}
      const parsedComments = Object.values(comments)
      setComments(parsedComments)
    })
  }

  const fetchAndSubscribeToData = () =>{
    fetchSelectedProfile();
    subscribeComments()
  }
  
  const mountEffect = useCallback(fetchAndSubscribeToData, []);

  const handleSubmit = (comment) => {
    const newCommentRef = database.ref(ref).push();
    const createdAt = new Date().toDateString();
    const newComment = {comment, author: currentUserProfile.displayName, createdAt, id:newCommentRef.key}
    newCommentRef.set(newComment)
  }

  useEffect(()=>{
    mountEffect()
  }, [mountEffect])

  return(
    <SectionWrapper>
      {selectedProfile && <ProfileContent {...selectedProfile} /> }
      <div className='comments-container'>
        <h3>Comments</h3>
        <Comments comments={comments} handleSubmit={handleSubmit} />
      </div>
    </SectionWrapper>
  ) 
};

export default withRouter(SelectedProfile);
