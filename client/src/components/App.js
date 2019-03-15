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
        primary: {
          main: '#1A237E',
          light: '#8790e6',
        },
        secondary: {
          main: '#FFEB3B',
        },
        background: { default: '#04072D' },
        type: 'dark',
        text: {
          secondary: '#000000',
        },
      },
      typography: {
        useNextVariants: true,
        fontFamily: ['Rubik'].join(','),
        h1: { fontStyle: 'light' },
        h2: { fontStyle: 'light' },
        h3: { fontStyle: 'regular' },
        h4: { fontStyle: 'regular' },
        h5: { fontStyle: 'medium' },
        h6: { fontStyle: 'medium' },
        body1: { fontStyle: 'regular' },
        body2: { fontStyle: 'regular' },
        subtitle1: { fontStyle: 'medium' },
        subtitle2: { fontStyle: 'medium' }
      },
      overrides: {
        MuiPickersToolbar: {
          toolbar: {
            backgroundColor: '#8790e6',
          },
        },
        MuiPickersDay: {
          isSelected: {
            backgroundColor: '#8790e6',
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: '#ffffff',
          },
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
