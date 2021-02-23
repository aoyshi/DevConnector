import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () =>
  <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Developer Connector</h1>
        <p className="lead">
          Coding doesn't have to be an individual sport. Connect with fellow developers. Share your ideas and resumes.
        </p>
        <div className="buttons">
          <Link to='/register' className="btn btn-primary">
            Register
          </Link>
          <Link to='/login' className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </div>
  </section>
