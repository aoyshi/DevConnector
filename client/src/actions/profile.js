import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';

export const getCurrentProfileAction = () => async dispatch => {
  try {
    const res = await axios.get('/api/profiles/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const createProfileAction = (formData, history, edit = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/profiles', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit? 'Profile updated' : 'Profile created', 'success'));

    // Redirect if create profile
    if(!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const { errors } = err.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/profiles/experiences', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
}

export const addEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/profiles/educations', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: errors,
    });
  }
}

