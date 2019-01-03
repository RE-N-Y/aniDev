import React, { Component } from 'react';
import { Field } from 'redux-form';
import form from '../extensions/form';

class PostForm extends Component {
  onSubmit = (formProps) => {
    const {
      requestType, createRequest, history, updateRequest, id,
    } = this.props;

    if (requestType === 'post') {
      createRequest(formProps, 'posts', () => {
        history.push('/');
      });
    } else if (requestType === 'put') {
      updateRequest(formProps, 'posts', id, () => {
        history.push('/');
      });
    }
  };

  render() {
    const { handleSubmit, renderQuill } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" type="text" component="input" label="Title" />
        <Field name="content" component={renderQuill} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default form(PostForm, 'postForm');
