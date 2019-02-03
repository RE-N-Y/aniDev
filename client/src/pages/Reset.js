import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
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
    const { handleSubmit, resetErrorMessage } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>New Password</label>
          <Field name="password" type="password" component="input" />
        </fieldset>
        <div>{resetErrorMessage}</div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth: { resetErrorMessage } }) => ({
  resetErrorMessage,
});

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  reduxForm({ form: 'resetForm' }),
)(Reset);
