import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPostAction } from '../../actions/post';
import Spinner from '../../components/layout/Spinner';
import PostItem from './PostItem';

const Post = ({ match, getPostAction, post: { post, loading } }) => {
  useEffect(() => getPostAction(match.params.id), [getPostAction, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showDiscussionBtn={false} />
    </Fragment>
  );
};

Post.propTypes = {
  getPostAction: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostAction })(Post);
