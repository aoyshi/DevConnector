import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layout/Alert';
import CreateProfile from './components/dashboard/profile/forms/CreateProfile';
import EditProfile from './components/dashboard/profile/forms/EditProfile';
import AddExperience from './components/dashboard/profile/forms/AddExperience';
import AddEducation from './components/dashboard/profile/forms/AddEducation';
import { loadUserAction } from './actions/auth';
import setAuthTokenHeader from './utils/setAuthTokenHeader';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.token) {
  setAuthTokenHeader(localStorage.token);
}

const App = () => {
  useEffect(
    () => store.dispatch(loadUserAction()),
    [],
  );
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profiles/users/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
)};

export default App;
