import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PostForm from '../components/PostForm';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  async componentWillMount() {
    const response = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
    this.setState({ title: response.data.title, content: response.data.content });
  }

  render() {
    return (
      <div>
        <PostForm
          {...this.props}
          requestType="put"
          initialValues={this.state}
          id={this.props.match.params.id}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreatePost);
