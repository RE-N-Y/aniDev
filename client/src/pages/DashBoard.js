import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import requireAuth from '../components/extensions/requireAuth';

class DashBoard extends Component {
  render() {
    return (
      <div>
        <Link to="/admin/posts/pages/1">
          <Button>Post</Button>
        </Link>
        <Link to="/admin/animes/pages/1">
          <Button>Anime</Button>
        </Link>
        <Link to="/admin/characters/pages/1">
          <Button>Character</Button>
        </Link>
        <Link to="/admin/users/pages/1">
          <Button>User</Button>
        </Link>
        <Link to="/admin/studios/pages/1">
          <Button>Studio</Button>
        </Link>
      </div>
    );
  }
}

export default requireAuth(DashBoard, ['admin']);
