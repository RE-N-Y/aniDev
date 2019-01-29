import React, { Component } from 'react';
import requireAuth from '../components/extensions/requireAuth';

class Profile extends Component {
  render() {
    return (
      <div>
        <div>Profile</div>
      </div>
    );
  }
}

export default requireAuth(Profile, ['admin', 'editor', 'member']);
