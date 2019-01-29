import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Anime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  async componentWillMount() {
    const response = await axios.get(`http://localhost:5000/animes/${this.props.match.params.id}`);
    this.setState({ data: response.data });
  }

  render() {
    const {
      title, review, synopsis, rating,
    } = this.state.data;
    return (
      <div>
        <h2>{title}</h2>
        <p>{synopsis}</p>
        <p>{rating}</p>
        <div dangerouslySetInnerHTML={{ __html: review }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Anime);
