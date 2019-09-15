import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { GlobalContext, ModalContext } from "../../context";
import { SectionWrapper, Form, Loader } from "../../components";
import { schema } from "./Login.schema";

export default ({ history }) => {
  const { createSession } = useContext(GlobalContext);
  const { setModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const handleLogin = async formData => {
    setLoading(true);
    try {
      const { email, password } = formData;
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      await createSession();
      history.push("/my-profile");
    } catch (error) {
      console.log("error loging in", error);
      setModal({
        isOpen: true,
        content: "Could not login with these credentials, please try again."
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      {loading ? (
        <Loader />
      ) : (
        <Form schema={schema} handleSubmit={handleLogin} />
      )}
    </SectionWrapper>
  );
};
