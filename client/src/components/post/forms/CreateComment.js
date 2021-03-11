import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createCommentAction } from '../../../actions/post';
import { connect } from 'react-redux';

const CreateComment = ({ postId, createCommentAction }) => {
  const [ formData, setFormData ] = useState({ text: '' });

  const { text } = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCommentAction(postId, formData);
    setFormData({ text: '' })
  };

  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={ (e) => onSubmit(e) }>
          <textarea
            name="text"
            value={text}
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            onChange = { (e) => onChange(e) }
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>
  );
};

CreateComment.propTypes = {
  createCommentAction: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

export default connect(null, { createCommentAction })(CreateComment);
