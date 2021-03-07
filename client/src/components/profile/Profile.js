import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfileByUserId } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ExperienceItem from './ExperienceItem';
import EducationItem from './EducationItem';
import GithubRepos from './GithubRepos';

const Profile = ({ getProfileByUserId, match, profile: {profile, loading}, auth }) => {
  useEffect(
    () => getProfileByUserId(match.params.id),
    [getProfileByUserId, match.params.id]
  );
  return (
    <Fragment>
      <Link to="/profiles" className="btn btn-primary">Back To Profiles</Link>
      { 
        profile===null || loading ? <Spinner /> : <Fragment>
          { auth.isAuthenticated && !auth.loading && 
            auth.user._id===profile.user._id && 
            (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)
          }
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div class="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {
              profile.experience.length>0 ? 
              (<Fragment>
                {
                  profile.experience.map((exp) => (
                    <ExperienceItem key={exp._id} experience={exp} />
                  ))
                }
              </Fragment>) :
              (<p>No experience history.</p>)
            }
            </div>

            <div class="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
              profile.education.length>0 ? 
              (<Fragment>
                {
                  profile.education.map((edu) => (
                    <EducationItem key={edu._id} education={edu} />
                  ))
                }
              </Fragment>) :
              (<p>No education history.</p>)
            }
            </div>

            <div className="profile-github">
              <h2 class="text-primary my-1">
                <i class="fab fa-github"></i> Github Repos
              </h2>
              {profile.githubUsername ? 
                (<GithubRepos gitUsername={profile.githubUsername} name={profile.user.name} />) : 
                (<div>Looks like {profile.user.name} does not have a Github account yet.</div>)
              }
            </div>
          </div>
        </Fragment> 
      }
    </Fragment>
  )
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
