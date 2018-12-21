import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../components/requireAuth';
import * as actions from '../actions';

class Profile extends Component {
  render() {
    return <div>Profile</div>;
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(
  mapStateToProps,
  actions,
)(requireAuth(Profile));
