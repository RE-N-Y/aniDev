import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Typography, Card, CardMedia } from '@material-ui/core/';
import {
  Star, StarHalf, Create, Brush, PermIdentity, Audiotrack,
} from '@material-ui/icons';
import { bufferToImage } from '../components/extensions/Util';
import ReadMore from '../components/ReadMore';

class Anime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        startedAiring: '',
        finishedAiring: '',
        relatedAnimes: [],
        relatedCharacters: [],
        relatedStudios: [],
        genres: [],
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
      relatedStudios,
      story,
      art,
      music,
      character,
      genres,
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
          <Typography variant="h4">{title}</Typography>
          <div>
            <div style={styles.stars}>
              {[...Array(numStar)].map((value, index) => (
                <Star key={index} />
              ))}
              {rating / 2 - numStar < 0.5 ? null : <StarHalf />}
              <Typography color="secondary">{rating}</Typography>
            </div>
            <Typography variant="subtitle2">Rating</Typography>
          </div>
          <div>
            {relatedStudios.map((item, index) => (
              <Typography key={index} color="secondary">
                {item.name}
              </Typography>
            ))}
            <Typography variant="subtitle2">Studios</Typography>
          </div>
          <div>
            <div>
              <Typography color="secondary">{story}</Typography>
              <Create color="secondary" />
              <Typography variant="subtitle2">Story</Typography>
            </div>
            <div>
              <Typography color="secondary">{art}</Typography>
              <Brush color="secondary" />
              <Typography variant="subtitle2">Art</Typography>
            </div>
            <div>
              <Typography color="secondary">{character}</Typography>
              <PermIdentity color="secondary" />
              <Typography variant="subtitle2">Character</Typography>
            </div>
            <div>
              <Typography color="secondary">{music}</Typography>
              <Audiotrack color="secondary" />
              <Typography variant="subtitle2">Music</Typography>
            </div>
          </div>
          <div>
            {genres.map((item, index) => (
              <Typography key={index} color="secondary">
                {item}
              </Typography>
            ))}
            <Typography variant="subtitle2">Genres</Typography>
          </div>
        </div>
        <div>
          <Typography>Synopsis</Typography>
          <Typography>{synopsis}</Typography>
        </div>
        <ReadMore collapsed={70}>
          <div
            style={{ color: '#fff', fontFamily: 'Rubik' }}
            dangerouslySetInnerHTML={{ __html: review }}
          />
        </ReadMore>
        <p>{startedAiring.substring(0, 10)}</p>
        <p>{finishedAiring.substring(0, 10)}</p>
        <p>{`likes: ${likes}`}</p>
        {relatedAnimes.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
        {relatedCharacters.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Anime);
