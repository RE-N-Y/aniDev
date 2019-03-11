import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Typography, FormGroup } from '@material-ui/core';
import form from '../components/extensions/form';
import * as actions from '../actions';

class Forgot extends Component {
  onSubmit = (formProps) => {
    this.props.sendResetMail(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit, resetErrorMessage, renderTextField } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FormGroup>
          <Typography>Enter Email</Typography>
          <Field name="email" component={renderTextField} />
          <div>{resetErrorMessage}</div>
        </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = ({ auth: { resetErrorMessage } }) => ({
  resetErrorMessage,
});

const WrappedForgotForm = form(Forgot, 'forgotForm');

export default connect(
  mapStateToProps,
  actions,
)(WrappedForgotForm);
