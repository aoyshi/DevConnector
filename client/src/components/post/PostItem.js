import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import { addLikeAction, deletePostAction, removeLikeAction } from '../../actions/post';

const PostItem = ({
  auth,
  addLikeAction,
  removeLikeAction,
  deletePostAction,
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    createdAt,
  },
}) => {
  return (
    <div>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profiles/users/${_id}`}>
            <img
              className="round-img"
              src={ avatar }
              alt=""
            />
            <h4>{ name }</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{ text }</p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{moment.utc(createdAt)}</Moment>
            </p>
          <button type="button" className="btn btn-light" onClick={() => !auth.loading && auth.isAuthenticated && addLikeAction(_id)}>
            <i className="fas fa-thumbs-up"></i>
            <span>{' '}
              { likes.length>0 && likes.length }
            </span>
          </button>
          <button type="button" className="btn btn-light" onClick={() => !auth.loading && auth.isAuthenticated && removeLikeAction(_id)}>
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            { 
              comments.length > 0 &&
              <span className='comment-count'>{ comments.length }</span>
            }
          </Link>
          { 
            !auth.loading && auth.isAuthenticated && user===auth.user._id && (
              <button type="button" className="btn btn-danger" onClick={() => deletePostAction(_id)}>
                <i className="fas fa-times"></i>
              </button>
            )
          }    
        </div>
      </div>
    </div>
  )
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeAction: PropTypes.func.isRequired,
  removeLikeAction: PropTypes.func.isRequired,
  deletePostAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    addLikeAction,
    removeLikeAction,
    deletePostAction,
  }
)(PostItem);
