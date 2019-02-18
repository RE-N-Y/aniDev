import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import * as actions from '../../actions';
import form from '../extensions/form';

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
            <Field
              name="username"
              label="Username"
              variant="outlined"
              component={renderTextField}
            />
          </fieldset>
        ) : null}
        <fieldset>
          <Field
            name="email"
            label="Email"
            variant="outlined"
            component={renderTextField}
            inputStyle={{ backgroundColor: 'red' }}
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            component={renderTextField}
          />
        </fieldset>
        <a href="http://localhost:3000/forgot">Forgot Passowrd?</a>
        <div>{this.props.errorMessage}</div>
        <Button color="primary" type="submit" variant="contained">
          {this.props.signup ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button variant="contained" href="http://localhost:5000/auth/google">
          Sign in with Google
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({ errorMessage: state.auth.errorMessage });

export default connect(
  mapStateToProps,
  actions,
)(form(AuthForm, 'authForm'));
