import React, { useContext } from "react";
import {GlobalContext} from "../../context";
import { SectionWrapper, ProfileContent } from "../../components";

export default _ => {
  const { globalState = {} } = useContext(GlobalContext);
  const { currentUserProfile } = globalState

  return(
    <SectionWrapper>
      <ProfileContent {...currentUserProfile} />
    </SectionWrapper>
  ) 
};
