import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requireAuth from '../components/extensions/requireAuth';

class DashBoard extends Component {
  render() {
    return (
      <div>
        <Link to="/admin/posts/pages/1">Post</Link>
        <Link to="/admin/animes/pages/1">Anime</Link>
        <Link to="/admin/characters/pages/1">Character</Link>
        <Link to="/admin/users/pages/1">User</Link>
      </div>
    );
  }
}

export default requireAuth(DashBoard, ['admin']);
