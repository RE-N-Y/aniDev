import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bufferToImage } from '../components/extensions/Util';

class Anime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        startedAiring: '',
        finishedAiring: '',
        relatedAnimes: [],
        relatedCharacters: [],
      },
    };
  }

  async componentWillMount() {
    const response = await axios.get(`http://localhost:5000/animes/${this.props.match.params.id}`);
    this.setState({ data: response.data });
  }

  render() {
    const {
      title,
      review,
      synopsis,
      rating,
      thumbnail,
      mainImage,
      startedAiring,
      finishedAiring,
      likes,
      relatedAnimes,
      relatedCharacters,
    } = this.state.data;
    return (
      <div>
        <h2>{title}</h2>
        <p>{synopsis}</p>
        <p>{rating}</p>
        <div dangerouslySetInnerHTML={{ __html: review }} />
        <img alt="thumbnail" src={bufferToImage(thumbnail)} />
        <img alt="mainImage" src={bufferToImage(mainImage)} />
        <p>{startedAiring.substring(0, 10)}</p>
        <p>{finishedAiring.substring(0, 10)}</p>
        <p>{`likes: ${likes}`}</p>
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

export default connect(mapStateToProps)(Anime);
