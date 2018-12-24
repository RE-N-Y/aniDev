import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';
import 'react-quill/dist/quill.snow.css';

class PostForm extends Component {
  handleChange = (value) => {
    this.props.updatePostForm(value);
  };

  onSubmit = (formProps) => {
    const {
      requestType, createPost, history, authorName, updatePost, id,
    } = this.props;
    const { title, content } = formProps;

    if (requestType === 'post') {
      createPost({ title, authorName, content }, () => {
        history.push('/');
      });
    } else if (requestType === 'put') {
      updatePost({ title, authorName, content }, id, () => {
        history.push('/');
      });
    }
  };

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
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" type="text" component="input" label="Title" />
        <Field name="content" component={this.renderQuill} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  authorName: state.auth.authenticated && state.auth.authenticated.username,
});

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  reduxForm({ form: 'postForm', enableReinitialize: true }),
)(PostForm);
