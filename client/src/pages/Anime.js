import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Typography, Card, CardMedia, Avatar,
} from '@material-ui/core/';
import {
  Star, StarHalf, Create, Brush, PermIdentity, Audiotrack,
} from '@material-ui/icons';
import { Link } from 'react-router-dom'; 
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
      main: {
        display: 'flex',
        flexDirection: 'column',
      },
      container: {
        display: 'flex'
      },
      card: {
        maxHeight: 430,
        width: 265,
        margin: 15,
      },
      thumbnail: {
        maxHeight: 350,
        width: 170,
        margin: 5,
      },
      noDeco: {
        textDecoration: 'none',
      },
      media: {
        objectFit: 'cover',
      },
      stars: {
        display: 'flex',
        color: '#FDD835',
      },
      avatar: {
        margin: 10,
        width: 80,
        height: 80,
      },
      normalMargin: {
        margin:10,
      },
      smallMargin: {
        marginRight: 5,
      },
      horizontalCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    };

    const numStar = rating ? Math.floor(rating / 2) : 0;

    return (
      <div style={styles.main}>
        <img style={styles.mainImage} alt="mainImage" src={bufferToImage(mainImage)} />
        <div style={styles.container}>
          <Card raised style={styles.card}>
            <CardMedia
              style={styles.media}
              component="img"
              width="140"
              src={bufferToImage(thumbnail)}
            />
          </Card>
          <div>
            <Typography variant="h5" style={styles.normalMargin}>{title}</Typography>
            <div style={styles.container}>
              <div style={styles.normalMargin}>
                <div style={styles.stars}>
                  <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>{rating}</Typography>
                  {[...Array(numStar)].map((value, index) => (
                    <Star key={index} />
                  ))}
                  {rating / 2 - numStar < 0.5 ? null : <StarHalf />}
                </div>
                <Typography variant="subtitle2">Rating</Typography>
              </div>
              <div style={styles.normalMargin}>
                {relatedStudios.map((item, index) => (
                  <Typography key={index} color="secondary" variant="subtitle1">
                    {item.name}
                  </Typography>
                ))}
                <Typography variant="subtitle2">Studios</Typography>
              </div>
              <div style={styles.container}>
                <div style={{...styles.normalMargin,...styles.horizontalCenter}}>
                  <div style={styles.container}>
                    <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>{story}</Typography>
                    <Create color="secondary" />
                  </div>
                    <Typography variant="subtitle2">Story</Typography>
                </div>
                <div style={{...styles.normalMargin,...styles.horizontalCenter}}>
                  <div style={styles.container}>
                    <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>{art}</Typography>
                    <Brush color="secondary" />
                  </div>
                    <Typography variant="subtitle2">Art</Typography>
                </div>
                <div style={{...styles.normalMargin,...styles.horizontalCenter}}>
                  <div style={styles.container}>
                    <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>{character}</Typography>
                    <PermIdentity color="secondary" />
                  </div>
                    <Typography variant="subtitle2">Character</Typography>
                </div>
                <div style={{...styles.normalMargin,...styles.horizontalCenter}}>
                  <div style={styles.container}>
                    <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>{music}</Typography>
                    <Audiotrack color="secondary" />
                  </div>
                    <Typography variant="subtitle2">Music</Typography>
                </div>
              </div>
              <div style={styles.normalMargin}>
                {genres.map((item, index) => (
                  <Typography key={index} color="secondary" variant="subtitle1">
                    {item}
                  </Typography>
                ))}
                <Typography variant="subtitle2">Genres</Typography>
              </div>
              <div style={{...styles.normalMargin,...styles.container}}>
                <div style={styles.smallMargin}>
                  <Typography variant="subtitle1" color="secondary">
                    {startedAiring ? startedAiring.substring(0,10) : startedAiring}
                  </Typography>
                  <Typography variant="subtitle2">Started Airing</Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" color="secondary">
                    {finishedAiring ? finishedAiring.substring(0,10) : finishedAiring}
                  </Typography>
                  <Typography variant="subtitle2">Finished Airing</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography variant="title">Synopsis</Typography>
          <Typography variant="body1">{synopsis}</Typography>
        </div>
        <div>
          <Typography variant="title">Review</Typography>
          <ReadMore collapsed={70}>
            <div
              style={{ color: '#fff', fontFamily: 'Rubik' }}
              dangerouslySetInnerHTML={{ __html: review }}
            />
          </ReadMore>
        </div>
        <div style={styles.container}>
          {relatedCharacters.map((item, index) => (
            <Link key={index} to={`localhost:3000/characters/${item._id}`} style={styles.noDeco}>
              <Typography>{item.name}</Typography>
              <Avatar style={styles.avatar} src={bufferToImage(item.thumbnail)} />
            </Link>
          ))}
        </div>
        <div style={styles.container}>
          {relatedAnimes.map((item, index) => (
            <Link key={index} to={`localhost:3000/animes/${item._id}`} style={styles.noDeco}>
              <Card key={index} raised style={styles.thumbnail}>
                <CardMedia
                  style={styles.media}
                  component="img"
                  width="140"
                  src={bufferToImage(item.thumbnail)}
                />
              </Card>
              <Typography variant="subtitle2">{item.title}</Typography>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Anime);
