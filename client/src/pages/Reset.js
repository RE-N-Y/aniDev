import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormGroup, Typography } from '@material-ui/core';
import form from '../components/extensions/form';
import * as actions from '../actions';

class Reset extends Component {
  onSubmit = (formProps) => {
    const {
      resetPassword,
      match: {
        params: { token },
      },
      history,
    } = this.props;
    resetPassword(formProps, token, () => {
      history.push('/');
    });
  };

  render() {
    const { handleSubmit, resetErrorMessage, renderTextField } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FormGroup>
          <Typography>Enter New Password</Typography>
          <Field name="password" type="password" component={renderTextField} />
          <div>{resetErrorMessage}</div>
        </FormGroup>
      </form>
    );
  }
}

const mapStateToProps = ({ auth: { resetErrorMessage } }) => ({
  resetErrorMessage,
});

const WrappedResetForm = form(Reset, 'resetForm');

export default connect(
  mapStateToProps,
  actions,
)(WrappedResetForm);
