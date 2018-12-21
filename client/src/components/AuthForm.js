import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';

class AuthForm extends Component {

	onSubmit = (formProps)=>{
		const callback = () => { this.props.history.push('/') };
		if(this.props.signup) {
			this.props.signupUser(formProps,callback);
		} else {
			this.props.loginUser(formProps,callback);
		}
	};

	render() {
		const { handleSubmit } = this.props;
		return(
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<fieldset>
					<label>Email</label>
					<Field
						name="email"
						type="text"
						component="input"
					/>
				</fieldset>
				<fieldset>
					<label>Password</label>
					<Field
						name="password"
						type="password"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<div>
					{this.props.errorMessage}
				</div>
				<button>{this.props.signup ? "Sign Up" : "Sign In"}</button>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	return { errorMessage: state.auth.errorMessage };
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({ form: 'authForm' })
)(AuthForm);