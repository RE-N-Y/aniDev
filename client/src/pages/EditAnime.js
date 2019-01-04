import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AnimeForm from '../components/forms/AnimeForm';

class EditAnime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      thumbnail: null,
      relatedCharacters: [],
      relatedAnimes: [],
    };
  }

  async componentWillMount() {
    const {
      data: {
        mainImage,
        thumbnail,
        relatedAnimes,
        relatedCharacters,
        startedAiring,
        finishedAiring,
        ...props
      },
    } = await axios.get(`http://localhost:5000/animes/${this.props.match.params.id}`);

    this.setState({
      ...props,
      mainImage: `data:image/jpg;base64,${Buffer.from(mainImage).toString('base64')}`,
      thumbnail: `data:image/jpg;base64,${Buffer.from(thumbnail).toString('base64')}`,
      startedAiring: new Date(startedAiring).toISOString().split('T')[0],
      finishedAiring: new Date(startedAiring).toISOString().split('T')[0],
      relatedAnimes: relatedAnimes.map(item => ({ content: item.title })),
      relatedCharacters: relatedCharacters.map(item => ({ content: item.name })),
    });
  }

  render() {
    return (
      <div>
        <AnimeForm
          {...this.props}
          requestType="put"
          initialValues={this.state}
          id={this.props.match.params.id}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EditAnime);
