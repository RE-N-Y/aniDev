import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import * as actions from '../actions';
import 'react-quill/dist/quill.snow.css';

class PostForm extends Component {
  handleChange = (value) => {
    this.props.updatePostForm(value);
  };

  handleClick = (event) => {
    const {
      requestType, createPost, content, history,
    } = this.props;
    event.preventDefault();
    const title = 'title';
    const authorName = 'admin';
    if (requestType === 'post') {
      createPost({ title, authorName, content }, () => {
        history.push('/');
      });
    } else if (requestType === 'put') {
    }
  };

  render() {
    return (
      <div>
        <ReactQuill value={this.props.content} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.post.post_content,
});

export default connect(
  mapStateToProps,
  actions,
)(PostForm);
