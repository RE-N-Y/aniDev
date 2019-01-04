import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimeForm from '../components/forms/AnimeForm';

class CreateAnime extends Component {
  render() {
    return (
      <div>
        <AnimeForm {...this.props} requestType="post" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreateAnime);
