import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../resources/images/Shinobu Logo.png';

const styles = theme => ({
  drawer: {
    width: 290,
    flexShrink: 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <nav className={classes.drawer}>
        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
          <img src={Logo} className={classes.logo} />
          <Link to="/">
            <Typography color="textSecondary">ANIPIN</Typography>
          </Link>
          <Link to="/signup">
            <Typography color="textSecondary">Sign Up</Typography>
          </Link>
          <Link to="/signin">
            <Typography color="textSecondary">Sign In</Typography>
          </Link>
          <a href="http://localhost:5000/logout">
            <Typography color="textSecondary">Log Out</Typography>
          </a>
          <Link to="/profile">
            <Typography color="textSecondary">Profile</Typography>
          </Link>
          <Link to="/admin">
            <Typography color="textSecondary">Admin</Typography>
          </Link>
        </Drawer>
      </nav>
    );
  }
}

export default withStyles(styles)(Header);
