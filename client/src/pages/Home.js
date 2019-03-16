import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Typography, Button, Chip, Divider, Card, CardContent, CardMedia,
} from '@material-ui/core';
import {
  Star,
  StarHalf,
  Whatshot,
  ArrowRight,
  Favorite,
  Done,
  FormatAlignLeft,
  Poll,
} from '@material-ui/icons';

class Home extends Component {
  render() {
    const styles = {
      main: {
        display: 'flex',
        flexDirection: 'column',
      },
      mainImage: {
        maxHeight: '500px',
        objectFit: 'cover',
        width: '100%',
      },
      mainImageContainer: {
        position: 'relative',
        width: '100%',
      },
      content: {
        padding: 25,
        zIndex: 99,
      },
    };
    return (
      <div style={styles.main}>
        <div style={styles.mainImageContainer}>
          <img alt="Featuring Anime" style={styles.mainImage} />
        </div>
        <div style={styles.content}>
          <div>
            <Typography>Personal Recommendations</Typography>
          </div>
          <div>
            <img alt="Featuring Post" />
          </div>
          <div>
            <Typography>Trending Now</Typography>
          </div>
          <div>
            <Typography>Posts & News</Typography>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Home);
