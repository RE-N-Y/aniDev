import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core/';

class Header extends Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/">ANIPIN</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <a href="http://localhost:5000/logout">Log Out</a>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
