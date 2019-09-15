import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../helpers";

const AuthRoute = ({ exact, path, component: Component, ...otherProps }) => (
  <Route
    exact={exact}
    path={path}
    render={() =>
      isLoggedIn() ? <Component {...otherProps} /> : <Redirect to="error" />
    }
  />
);

export default AuthRoute;
