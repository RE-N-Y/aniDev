import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CharacterForm from '../components/forms/CharacterForm';

class EditCharacter extends Component {
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
        name, description, thumbnail, relatedAnimes, relatedCharacters,
      },
    } = await axios.get(`http://localhost:5000/characters/${this.props.match.params.id}`);

    this.setState({
      name,
      description,
      thumbnail: `data:image/jpg;base64,${Buffer.from(thumbnail).toString('base64')}`,
      relatedAnimes: relatedAnimes.map(item => ({ content: item.title })),
      relatedCharacters: relatedCharacters.map(item => ({ content: item.name })),
    });
  }

  render() {
    return (
      <div>
        <CharacterForm
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

export default connect(mapStateToProps)(EditCharacter);
