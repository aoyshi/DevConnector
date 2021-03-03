import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfileAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';

const Dashboard = ({
  profile: { profile, loading },
  currentUser,
  getCurrentProfileAction,
}) => {
  useEffect(() => getCurrentProfileAction(), []);

  return (loading && profile===null) ? 
  <Spinner /> :
  <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i>{' '}
      Welcome { currentUser && currentUser.name }
    </p>
    { profile !== null ? 
      <DashboardActions /> :
      <Fragment>
        <p>You have not set up your profile yet.</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Your Profile
        </Link>
      </Fragment>
    }
  </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfileAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getCurrentProfileAction },
)(Dashboard);
