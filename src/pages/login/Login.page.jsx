import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { GlobalContext } from "../../context";
import { SectionWrapper, Form } from "../../components";
import { schema } from "./Login.schema";

export default ({ history }) => {
  const { createSession } = useContext(GlobalContext);
  const handleLogin = async formData => {
    try {
      const { email, password } = formData;
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!user) return;
      await createSession();
      history.push("/my-profile");
    } catch (error) {
      console.log("error loging in", error);
    }
  };
  return (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      <Form schema={schema} handleSubmit={handleLogin} />
    </SectionWrapper>
  );
};
