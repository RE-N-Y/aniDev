import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  async componentWillMount() {
    const response = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
    this.setState({ data: response.data });
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Post);
