import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPostsAction } from '../../actions/post';
import Spinner from '../../components/layout/Spinner';
import PostItem from './PostItem';
import CreatePost from './forms/CreatePost';

const Posts = ({ getPostsAction, auth, post: { loading, posts } }) => {
  useEffect(() => getPostsAction(), [getPostsAction]);

  return (
    loading ? <Spinner /> : (
      <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

        { !auth.loading && auth.isAuthenticated && <CreatePost /> }

        <div className="posts">
          { posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Fragment>
    )
  )
};

Posts.propTypes = {
  getPostsAction: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostsAction })(Posts);
