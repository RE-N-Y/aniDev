import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from '../components/PostForm';

class CreatePost extends Component {
  render() {
    return (
      <div>
        <PostForm {...this.props} requestType="post" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreatePost);
