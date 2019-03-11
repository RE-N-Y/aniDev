import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Typography, Card, CardMedia, CardContent,
} from '@material-ui/core/';
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
    const styles = {
      mainImage: {
        maxHeight: '500px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%)',
        objectFit: 'cover',
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      card: {
        maxHeight: 345,
        margin: 15,
      },
      media: {
        objectFit: 'cover',
      },
    };
    return (
      <div style={styles.container}>
        <img style={styles.mainImage} alt="mainImage" src={bufferToImage(mainImage)} />
        <Typography variant="title">{title}</Typography>
        <Typography variant="body2">{synopsis}</Typography>
        <Typography variant="subtitle2">{rating}</Typography>
        <div
          style={{ color: '#fff', fontFamily: 'Rubik' }}
          dangerouslySetInnerHTML={{ __html: review }}
        />
        <Card raised style={styles.card}>
          <img style={styles.media} src={bufferToImage(thumbnail)} />
        </Card>
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
