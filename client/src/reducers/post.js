import { POST_ERROR } from '../actions/types';

const INITIAL_STATE = {
  post_content: '',
  post_error: '',
};

const post = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_ERROR:
      return { ...state, post_error: action.payload };
    default:
      return state;
  }
};

export default post;
