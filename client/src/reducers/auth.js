import { AUTH_USER, AUTH_ERROR, RESET_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: null,
  errorMessage: '',
  resetErrorMessage: '',
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case RESET_ERROR:
      return { ...state, resetErrorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
