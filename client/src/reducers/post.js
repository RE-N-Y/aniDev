import { POST_ERROR, INIT_FORM } from '../actions/types';

const INITIAL_STATE = {
  formInitValues: null,
  post_error: '',
};

const post = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_ERROR:
      return { ...state, post_error: action.payload };
    case INIT_FORM:
      return { ...state, formInitValues: action.payload };
    default:
      return state;
  }
};

export default post;
