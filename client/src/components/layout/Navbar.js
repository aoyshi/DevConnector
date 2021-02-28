import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutAction } from '../../actions/auth';

const Navbar = ({ isAuthenticated, loading, logoutAction }) => {
  const authLinks = (
    <ul>
      <li>
        <Link onClick={ logoutAction } to="#!">
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return(
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          {' '}
          DevConnector
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated? authLinks : guestLinks }</Fragment>) }
    </nav>
)};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(
  mapStateToProps,
  { logoutAction },
)(Navbar);