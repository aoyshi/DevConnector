import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_FAILURE,
} from './types';
import { setAlert } from './alert';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

export const loadUserAction = () => async dispatch => {
  if(localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }
  try {
    const res = await axios.get('/api/users/me');
    dispatch(setAlert('Authenticated successfully!', 'success'));
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
    dispatch(setAlert('Account successfully created!', 'success'));
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
      type: REGISTER_FAILURE,
    });
  }
};