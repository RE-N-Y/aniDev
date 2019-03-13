import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Typography, Card, CardMedia } from '@material-ui/core/';
import { Star, StarHalf } from '@material-ui/icons';
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
        maxHeight: 430,
        width: 265,
        margin: 15,
      },
      media: {
        objectFit: 'cover',
      },
      stars: {
        display: 'flex',
        color: '#FDD835',
      },
    };

    const numStar = rating ? Math.floor(rating / 2) : 0;

    return (
      <div style={styles.container}>
        <img style={styles.mainImage} alt="mainImage" src={bufferToImage(mainImage)} />
        <Card raised style={styles.card}>
          <CardMedia
            style={styles.media}
            component="img"
            width="140"
            src={bufferToImage(thumbnail)}
          />
        </Card>
        <div>
          <Typography variant="title" color="secondary">
            {title}
          </Typography>
          <Typography variant="body2">{synopsis}</Typography>
          <div>
            <div style={styles.stars}>
              {[...Array(numStar)].map((e, i) => (
                <Star key={i} />
              ))}
              {rating / 2 - numStar < 0.5 ? null : <StarHalf />}
              <Typography variant="subtitle2" color="secondary">
                {rating}
              </Typography>
            </div>
            <Typography variant="subtitle1">Rating</Typography>
          </div>
        </div>
        <div
          style={{ color: '#fff', fontFamily: 'Rubik' }}
          dangerouslySetInnerHTML={{ __html: review }}
        />
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
