import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  githubRepos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        githubRepos: [],
        loading: false,
      }
    default:
      return state;
  }
};

export default profileReducer;