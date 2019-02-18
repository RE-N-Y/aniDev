import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary1Color: '#1A237E',
        accent1Color: '#ffff00',
        textColor: 'rgba(255, 255, 255, 0.89)',
        background: { default: '#04072D' },
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions,
  )(App),
);
