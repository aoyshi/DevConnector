import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
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
