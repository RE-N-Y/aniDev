import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../actions';

class Forgot extends Component {
  onSubmit = (formProps) => {
    this.props.sendResetMail(formProps, () => {
      this.props.history.push('/');
    });
  };

  render() {
    const { handleSubmit, resetErrorMessage } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" />
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
  reduxForm({ form: 'forgotForm' }),
)(Forgot);
