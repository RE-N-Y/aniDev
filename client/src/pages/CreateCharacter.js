import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterForm from '../components/forms/CharacterForm';

class CreateCharacter extends Component {
  render() {
    return (
      <div>
        <CharacterForm {...this.props} requestType="post" />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreateCharacter);
