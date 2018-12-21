import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signupUser = (formProps,callback) => async dispatch => {
	try {
		await axios.post('http://localhost:5000/signup',formProps);
		callback();
	} catch(e) {
		dispatch({type: AUTH_ERROR, payload: 'Email in use'});
	}
};

export const fetchUser = () => async dispatch => {
	try {
		const response = await axios('http://localhost:5000/profile',{method:'get',withCredentials:true});
		dispatch({type:AUTH_USER,payload:response.data});
	} catch(e) {
		console.log('fetch user error');
	}
};

export const loginUser = (formProps,callback) => async dispatch => {
	try {
		await axios('http://localhost:5000/signin',{method:'post',data:formProps,withCredentials:true});
		callback();
	} catch(e) {
		dispatch({type: AUTH_ERROR, payload: 'Login Failure'});
	}
};

export const logout = () => async dispatch => {
	await axios.get('http://localhost:5000/logout');
	dispatch({ type: AUTH_USER, payload: false });
};