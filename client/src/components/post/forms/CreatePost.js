import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createPostAction } from '../../../actions/post';
import { connect } from 'react-redux';

const CreatePost = ({ createPostAction }) => {
  const [ formData, setFormData ] = useState({ text: '' });

  const { text } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    createPostAction(formData);
    setFormData({ text: '' })
  };

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  })

  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
          <textarea
            cols="30"
            rows="5"
            placeholder="Create a post"
            name="text"
            value={text}
            onChange={(e) => onChange(e)}
            required >
          </textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>
  )
};

CreatePost.propTypes = {
  createPostAction: PropTypes.func.isRequired,
};

export default connect(null, { createPostAction })(CreatePost);
