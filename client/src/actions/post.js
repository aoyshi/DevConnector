import axios from 'axios';

import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  CREATE_POST,
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from './types';
import { setAlert } from './alert';

export const getPostsAction = () => async dispatch => {
  try {
    const res = await axios.get('api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostAction = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLikeAction = (postId) => async dispatch => {
  try {
    const res = await axios.post(`api/posts/${postId}/likes`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLikeAction = (postId) => async dispatch => {
  try {
    const res = await axios.delete(`api/posts/${postId}/likes`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePostAction = (postId) => async dispatch => {
  try {
    await axios.delete(`api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: { postId },
    });
    dispatch(setAlert('Post Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createPostAction = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('api/posts', formData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post created!', 'success'));
  } catch (err) {
    const { errors } = err.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: errors,
    });
  }
};

export const createCommentAction = (postId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/posts/${postId}/comments`, formData, config);
    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment created!', 'success'));
  } catch (err) {
    console.log('dsfdf')
    console.log(err)
    const { errors } = err.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: errors,
    });
  }
};

export const deleteCommentAction = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};