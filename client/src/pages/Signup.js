import React, { Component } from 'react';
import AuthForm from '../components/forms/AuthForm';

export default class Signin extends Component {
  render() {
    return (
      <div>
        <AuthForm signup {...this.props} />
      </div>
    );
  }
}
