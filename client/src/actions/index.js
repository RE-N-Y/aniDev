import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, POST_ERROR } from './types';

export const signupUser = (formProps, callback) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/signup', formProps);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Sign up error' });
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios('http://localhost:5000/profile', {
      method: 'get',
      withCredentials: true,
    });
    dispatch({ type: AUTH_USER, payload: response.data });
  } catch (e) {
    console.log('fetch user error');
  }
};

export const loginUser = (formProps, callback) => async (dispatch) => {
  try {
    await axios('http://localhost:5000/signin', {
      method: 'post',
      data: formProps,
      withCredentials: true,
    });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Login Failure' });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('http://localhost:5000/logout');
  dispatch({ type: AUTH_USER, payload: false });
};

export const createPost = (formProps, callback) => async (dispatch) => {
  try {
    await axios('http://localhost:5000/posts/addPost', {
      method: 'post',
      data: formProps,
      withCredentials: true,
    });
    callback();
  } catch (e) {
    dispatch({ type: POST_ERROR, payload: 'create post error' });
  }
};
