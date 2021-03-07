import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGithubRepos } from '../../actions/profile';

const GithubRepos = ({ gitUsername, name, getGithubRepos, githubRepos }) => {
  useEffect(
    () => getGithubRepos(gitUsername), 
    [getGithubRepos, gitUsername]
  );
  return (
    <div>
      {githubRepos.length===0 ? <div>Looks like {name} does not have any Github repositories yet.</div> : (
        githubRepos.map((repo) => (
          <div key={repo._id} class="repo bg-white p-1 my-1">
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
};

GithubRepos.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  githubRepos: PropTypes.array.isRequired,
  gitUsername: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  githubRepos: state.profile.githubRepos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubRepos);
