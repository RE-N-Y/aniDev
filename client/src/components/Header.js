import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon,
} from '@material-ui/core/';
import { AccountBoxOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../resources/images/Shinobu Logo.png';

const styles = theme => ({
  drawer: {
    width: 290,
    flexShrink: 0,
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
  },
  logo: {
    width: 200,
    height: 200,
    textAlign: 'center',
    display: 'block',
  },
  noDeco: {
    textDecoration: 'none',
  },
  black: {
    color: '#000000',
  },
});

class Header extends Component {
  render() {
    const {
      classes: {
        drawer, noDeco, logo, black,
      },
    } = this.props;

    return (
      <nav className={drawer}>
        <Drawer variant="permanent" classes={{ paper: drawer }}>
          <img alt="logo" src={Logo} className={logo} />
          <Link className={noDeco} to="/">
            <Typography align="center" variant="h4" color="textSecondary">
              ANIPIN
            </Typography>
          </Link>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBoxOutlined className={black} />
              </ListItemIcon>
              <Link className={noDeco} to="/signup">
                <Typography align="center" variant="subtitle1" color="textSecondary">
                  SIGN UP
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBoxOutlined className={black} />
              </ListItemIcon>
              <Link className={noDeco} to="/signin">
                <Typography align="center" variant="subtitle1" color="textSecondary">
                  SIGN IN
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBoxOutlined className={black} />
              </ListItemIcon>
              <a className={noDeco} href="http://localhost:5000/logout">
                <Typography align="center" variant="subtitle1" color="textSecondary">
                  LOG OUT
                </Typography>
              </a>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBoxOutlined className={black} />
              </ListItemIcon>
              <Link className={noDeco} to="/profile">
                <Typography align="center" variant="subtitle1" color="textSecondary">
                  PROFILE
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBoxOutlined className={black} />
              </ListItemIcon>
              <Link className={noDeco} to="/admin">
                <Typography align="center" variant="subtitle1" color="textSecondary">
                  ADMIN
                </Typography>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </nav>
    );
  }
}

export default withStyles(styles)(Header);
