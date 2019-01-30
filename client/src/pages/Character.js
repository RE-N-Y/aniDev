import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bufferToImage } from '../components/extensions/Util';

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        relatedAnimes: [],
        relatedCharacters: [],
      },
    };
  }

  async componentWillMount() {
    const response = await axios.get(
      `http://localhost:5000/characters/${this.props.match.params.id}`,
    );
    this.setState({ data: response.data });
  }

  render() {
    const {
      name,
      description,
      thumbnail,
      relatedAnimes,
      relatedCharacters,
      likes,
    } = this.state.data;
    return (
      <div>
        <p>{name}</p>
        <p>{likes}</p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <img alt="thumbnail" src={bufferToImage(thumbnail)} />
        {relatedAnimes.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
        {relatedCharacters.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Character);
