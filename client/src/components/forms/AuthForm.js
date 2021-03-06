import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../actions';
import form from '../extensions/form';

const style = theme => ({
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
  },
  cssLabel: {
    color: 'white !important',
  },
});

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
    const { handleSubmit, renderTextField, classes } = this.props;
    const inputStyle = {
      classes: {
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline,
      },
    };
    const inputLabelStyle = {
      classes: {
        root: classes.cssLabel,
        focused: classes.cssFocused,
      },
    };
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.props.signup ? (
          <fieldset>
            <Field
              name="username"
              label="Username"
              variant="outlined"
              component={renderTextField}
              InputLabelProps={inputLabelStyle}
              InputProps={inputStyle}
            />
          </fieldset>
        ) : null}
        <fieldset>
          <Field
            name="email"
            label="Email"
            variant="outlined"
            component={renderTextField}
            InputLabelProps={inputLabelStyle}
            InputProps={inputStyle}
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            component={renderTextField}
            InputLabelProps={inputLabelStyle}
            InputProps={inputStyle}
          />
        </fieldset>
        <Button href="http://localhost:3000/forgot">Forgot Password?</Button>
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

export default withStyles(style)(
  connect(
    mapStateToProps,
    actions,
  )(form(AuthForm, 'authForm')),
);
