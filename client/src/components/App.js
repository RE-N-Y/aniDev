import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import * as actions from '../actions';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: 290,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary1Color: '#1A237E',
        accent1Color: '#ffff00',
        textColor: '#000000',
        background: { default: '#04072D' },
        type: 'dark',
        typography: {
          useNextVariants: true,
        },
      },
    });

    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>{this.props.children}</main>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      null,
      actions,
    )(App),
  ),
);
