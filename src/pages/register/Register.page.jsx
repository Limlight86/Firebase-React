import React, { useContext, useState } from "react";
import { database, auth } from "../../firebase";
import { Form, SectionWrapper, Loader } from "../../components";
import { schema } from "./Register.schema";
import { ModalContext } from "../../context";
import { getProfilePicture } from "../../helpers";

export default ({ history }) => {
  const { setModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async formData => {
    setLoading(true);
    const { email, password, tagline, displayName, occupation, passwordConfirmation } = formData;
    if (password !== passwordConfirmation) return setModal({ isOpen: true, content: "Passwords did not match, please try again." });
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      if (!user) return;
      const photoURL = getProfilePicture();
      const newProfileRef = database.ref("/profiles").push();
      newProfileRef.set({
        id: newProfileRef.key,
        uid: user.uid,
        email,
        displayName,
        tagline,
        occupation,
        photoURL
      });
      history.push("/login");
    } catch (error) {
      console.log("There was an error creating user.", error);
      setModal({
        isOpen: true,
        content: "There was an error creating user. Please try again"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      {
        loading ? <Loader /> : <Form schema={schema} handleSubmit={handleRegister} /> 
      }
    </SectionWrapper>
  );
};
