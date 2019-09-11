import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProfileContextProvider, ModalContextProvider } from '../context';
import { Home, Login, MyProfile, Register, Error as ErrorPage, Profiles, SelectedProfile } from '../pages';
import { NavBar, Modal } from '../components';

export default _ => (
  <Router>
    <div className="container">
      <ProfileContextProvider>
        <NavBar />
        <ModalContextProvider>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Modal />
        </ModalContextProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/selected-profile/:profileId" component={SelectedProfile} />
      </ProfileContextProvider>
    </div>
  </Router>
);
