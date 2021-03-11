import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPostAction } from '../../actions/post';
import Spinner from '../../components/layout/Spinner';
import PostItem from './PostItem';
import CommentItem from './CommentItem';
import CreateComment from './forms/CreateComment';

const Post = ({ match, getPostAction, post: { post, loading }, auth }) => {
  useEffect(
    () => getPostAction(match.params.id),
    [getPostAction, match.params.id]
  );

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showDiscussionBtn={false} />
      <br />
      { auth.isAuthenticated && (<CreateComment postId={post._id} />)}
      <div class="comments">
        {
          post.comments.length>0 && post.comments.map(
            (comment, index) => (
              <CommentItem key={index} postId={post._id} comment={comment} />
            )
          )
        }
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPostAction: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPostAction })(Post);
