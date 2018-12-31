import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import 'react-quill/dist/quill.snow.css';

export default (ChildComponent, formName) => {
  class ComposedComponent extends Component {
    renderQuill = ({ input }) => (
      <ReactQuill
        {...input}
        onChange={(newValue, delta, source) => {
          if (source === 'user') {
            input.onChange(newValue);
          }
        }}
        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}
      />
    );

    render() {
      return <ChildComponent renderQuill={this.renderQuill} {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    username: state.auth.authenticated && state.auth.authenticated.username,
  });

  return compose(
    connect(
      mapStateToProps,
      actions,
    ),
    reduxForm({ form: formName, enableReinitialize: true }),
  )(ComposedComponent);
};
