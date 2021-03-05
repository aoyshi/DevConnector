import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
      
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
  
    case DELETE_ACCOUNT:
    case LOGOUT:
    case AUTH_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
  
    default:
      return state;
  }
}

export default authReducer;
