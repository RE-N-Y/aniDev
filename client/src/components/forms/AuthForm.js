import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AuthForm extends Component {
  onSubmit = (formProps) => {
    const callback = () => {
      this.props.fetchUser();
      this.props.history.push('/');
    };
    if (this.props.signup) {
      this.props.signupUser(formProps, callback);
    } else {
      this.props.loginUser(formProps, callback);
    }
  };

  render() {
    const { handleSubmit, renderTextField } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.props.signup ? (
          <fieldset>
            <label>Username</label>
            <Field name="username" type="text" component="input" />
          </fieldset>
        ) : null}
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component="input" autoComplete="none" />
        </fieldset>
        <a href="http://localhost:3000/forgot">Forgot Passowrd?</a>
        <div>{this.props.errorMessage}</div>
        <button>{this.props.signup ? 'Sign Up' : 'Sign In'}</button>
        <a href="http://localhost:5000/auth/google">Sign in with Google</a>
      </form>
    );
  }
}

const mapStateToProps = state => ({ errorMessage: state.auth.errorMessage });

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  reduxForm({ form: 'authForm' }),
)(AuthForm);
