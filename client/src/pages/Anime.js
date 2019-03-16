import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Typography, Card, CardMedia, Avatar, CardContent, Fab, Fade,
} from '@material-ui/core/';
import {
  Star,
  StarHalf,
  Create,
  Brush,
  PermIdentity,
  Audiotrack,
  Favorite,
  Check,
} from '@material-ui/icons';
import * as actions from '../actions';
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
      favorited: false,
    };
  }

  async componentWillMount() {
    const { data } = await axios.get(`http://localhost:5000/animes/${this.props.match.params.id}`);
    const {
      favoriteAnimes,
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ data, favorited: favoriteAnimes.includes(id) });
  }

  render() {
    const {
      data: {
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
      },
      favorited,
    } = this.state;

    const styles = {
      mainImage: {
        maxHeight: '500px',
        objectFit: 'cover',
        borderRadius: '0 0 50% 50% / 15%',
        width: '100%',
        zIndex: -2,
      },
      mainImageContainer: {
        position: 'relative',
        boxShadow: 'inset 0px 0px 100px 100px rgba(0,0,0,0.6)',
        borderRadius: '0 0 50% 50% / 15%',
        width: '100%',
      },
      fab: {
        position: 'absolute',
        bottom: 32,
        right: 32,
      },
      main: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        padding: 25,
        zIndex: 99,
      },
      favIcon: {
        position: 'absolute',
      },
      container: {
        display: 'flex',
      },
      card: {
        maxHeight: 430,
        width: 265,
        marginTop: -120,
      },
      thumbnail: {
        maxHeight: 350,
        width: 180,
        margin: 5,
        background: 'transparent',
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
        width: 90,
        height: 90,
      },
      normalMargin: {
        margin: 10,
      },
      smallMargin: {
        marginRight: 5,
      },
      gutter: {
        marginBottom: 10,
      },
      horizontalCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      reviewStyle: {
        marginBottom: -10,
      },
    };

    const numStar = rating ? Math.floor(rating / 2) : 0;
    const updatedLikes = favorited ? likes + 1 : likes;

    const favorite = () => {
      this.setState({ favorited: !this.state.favorited }, () => {
        const {
          updateFavorite,
          match: {
            params: { id },
          },
        } = this.props;
        if (this.state.favorited) {
          updateFavorite('animes', id, 'add');
        } else {
          updateFavorite('animes', id, 'remove');
        }
      });
    };

    return (
      <div style={styles.main}>
        <div style={styles.mainImageContainer}>
          <img style={styles.mainImage} alt="mainImage" src={bufferToImage(mainImage)} />
          <Fab style={styles.fab} color="secondary" onClick={favorite}>
            <Fade in={favorited} style={styles.favIcon}>
              <Check />
            </Fade>
            <Fade in={!favorited} style={styles.favIcon}>
              <Favorite />
            </Fade>
          </Fab>
        </div>
        <div style={styles.content}>
          <div style={{ ...styles.container, ...styles.gutter }}>
            <Card raised style={styles.card}>
              <CardMedia style={styles.media} component="img" src={bufferToImage(thumbnail)} />
            </Card>
            <div style={styles.normalMargin}>
              <Typography variant="h4" style={styles.normalMargin}>
                {title}
              </Typography>
              <div>
                <div style={styles.container}>
                  <div style={styles.normalMargin}>
                    <div style={styles.stars}>
                      <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>
                        {rating}
                      </Typography>
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
                    <div style={{ ...styles.normalMargin, ...styles.horizontalCenter }}>
                      <div style={styles.container}>
                        <Typography
                          color="secondary"
                          variant="subtitle1"
                          style={styles.smallMargin}
                        >
                          {story}
                        </Typography>
                        <Create color="secondary" />
                      </div>
                      <Typography variant="subtitle2">Story</Typography>
                    </div>
                    <div style={{ ...styles.normalMargin, ...styles.horizontalCenter }}>
                      <div style={styles.container}>
                        <Typography
                          color="secondary"
                          variant="subtitle1"
                          style={styles.smallMargin}
                        >
                          {art}
                        </Typography>
                        <Brush color="secondary" />
                      </div>
                      <Typography variant="subtitle2">Art</Typography>
                    </div>
                    <div style={{ ...styles.normalMargin, ...styles.horizontalCenter }}>
                      <div style={styles.container}>
                        <Typography
                          color="secondary"
                          variant="subtitle1"
                          style={styles.smallMargin}
                        >
                          {character}
                        </Typography>
                        <PermIdentity color="secondary" />
                      </div>
                      <Typography variant="subtitle2">Character</Typography>
                    </div>
                    <div style={{ ...styles.normalMargin, ...styles.horizontalCenter }}>
                      <div style={styles.container}>
                        <Typography
                          color="secondary"
                          variant="subtitle1"
                          style={styles.smallMargin}
                        >
                          {music}
                        </Typography>
                        <Audiotrack color="secondary" />
                      </div>
                      <Typography variant="subtitle2">Music</Typography>
                    </div>
                  </div>
                </div>
                <div style={styles.container}>
                  <div style={styles.normalMargin}>
                    <div style={styles.container}>
                      <Typography color="secondary" variant="subtitle1" style={styles.smallMargin}>
                        {updatedLikes}
                      </Typography>
                      <Favorite color="secondary" />
                    </div>
                    <Typography variant="subtitle2">Likes</Typography>
                  </div>
                  <div style={styles.normalMargin}>
                    {genres.map((item, index) => (
                      <Typography key={index} color="secondary" variant="subtitle1">
                        {item}
                      </Typography>
                    ))}
                    <Typography variant="subtitle2">Genres</Typography>
                  </div>
                  <div style={styles.normalMargin}>
                    <Typography variant="subtitle1" color="secondary">
                      {startedAiring ? startedAiring.substring(0, 10) : startedAiring}
                    </Typography>
                    <Typography variant="subtitle2">Started Airing</Typography>
                  </div>
                  <div style={styles.normalMargin}>
                    <Typography variant="subtitle1" color="secondary">
                      {finishedAiring ? finishedAiring.substring(0, 10) : finishedAiring}
                    </Typography>
                    <Typography variant="subtitle2">Finished Airing</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.gutter}>
            <Typography variant="title">Synopsis</Typography>
            <Typography variant="body2">{synopsis}</Typography>
          </div>
          <div style={styles.gutter}>
            <Typography variant="title" style={styles.reviewStyle}>
              Review
            </Typography>
            <ReadMore collapsed={95}>
              <div
                style={{ color: '#fff', fontFamily: 'Rubik' }}
                dangerouslySetInnerHTML={{ __html: review }}
              />
            </ReadMore>
          </div>
          <div style={styles.container}>
            <div>
              <Typography variant="title">Characters</Typography>
              <div style={styles.container}>
                {relatedCharacters.map((item, index) => (
                  <a
                    key={index}
                    href={`http://localhost:3000/characters/${item._id}`}
                    style={{ ...styles.noDeco, ...styles.normalMargin }}
                  >
                    <div style={styles.horizontalCenter}>
                      <Avatar style={styles.avatar} src={bufferToImage(item.thumbnail)} />
                      <Typography variant="subtitle1" style={{ lineHeight: 1.25, fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.role ? item.role.toUpperCase() : item.role}
                      </Typography>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="title" style={{ marginLeft: '15' }}>
                Related Animes
              </Typography>
              <div style={styles.container}>
                {relatedAnimes.map((item, index) => (
                  <a
                    key={index}
                    href={`http://localhost:3000/animes/${item._id}`}
                    style={{ ...styles.noDeco, ...styles.normalMargin }}
                  >
                    <Card key={index} style={styles.thumbnail}>
                      <CardMedia
                        style={styles.media}
                        component="img"
                        width="140"
                        src={bufferToImage(item.thumbnail)}
                      />
                      <CardContent style={{ padding: 5 }}>
                        <Typography
                          variant="subtitle1"
                          style={{ lineHeight: 1.25, fontWeight: 500 }}
                        >
                          {item.title}
                        </Typography>
                        <div style={{ ...styles.container, justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="textSecondary">
                            {item.startedAiring
                              ? item.startedAiring.substring(0, 4)
                              : item.startedAiring}
                          </Typography>
                          <div style={styles.container}>
                            <Star color="secondary" fontSize="small" style={styles.smallMargin} />
                            <Typography variant="caption" color="secondary">
                              {item.rating}
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => ({
  favoriteAnimes: authenticated ? authenticated.favoriteAnimes : authenticated,
});

export default connect(
  mapStateToProps,
  actions,
)(Anime);
