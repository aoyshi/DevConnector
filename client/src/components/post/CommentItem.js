import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

import { deleteCommentAction } from '../../actions/post';

const CommentItem = ({ 
  auth,
  comment: { _id, user, name, avatar, text, createdAt },
  postId,
  deleteCommentAction,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/users/${user}`}>
          <img
            class="round-img"
            src={ avatar }
            alt=""
          />
          <h4>{ name }</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          { text }
        </p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{ moment.utc(createdAt) }</Moment>
        </p>
        { !auth.loading && 
          auth.isAuthenticated && 
          user === auth.user._id && (
            <button      
              type="button"
              class="btn btn-danger"
              onClick={() => deleteCommentAction(postId, _id)} >
              <i class="fas fa-times"></i>
            </button>
          )
        }
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  deleteCommentAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCommentAction })(CommentItem);
