import axios from 'axios';

import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

export const loadUserAction = () => async dispatch => {
  if(localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }
  try {
    const res = await axios.get('/api/users/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    const { errors } = e.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: AUTH_FAILURE,
    });
  }
}

export const registerAction = ({ name, email, password }) => async dispatch => {
  const newUser = { name, email, password };
  const body = JSON.stringify(newUser);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUserAction());
  } catch (e) {
    const { errors } = e.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const loginAction = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUserAction());
  } catch (e) {
    const { errors } = e.response.data;
    if(errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const logoutAction = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
}