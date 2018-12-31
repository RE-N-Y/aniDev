import React, { Component } from 'react';
import { Field } from 'redux-form';
import form from '../extensions/form';

class PostForm extends Component {
  handleChange = (value) => {
    this.props.updatePostForm(value);
  };

  onSubmit = (formProps) => {
    const {
      requestType, createPost, history, username, updatePost, id,
    } = this.props;
    const { title, content } = formProps;

    if (requestType === 'post') {
      createPost({ title, username, content }, () => {
        history.push('/');
      });
    } else if (requestType === 'put') {
      updatePost({ title, username, content }, id, () => {
        history.push('/');
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" type="text" component="input" label="Title" />
        <Field name="content" component={this.props.renderQuill} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default form(PostForm, 'postForm');
