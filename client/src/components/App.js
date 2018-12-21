import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { withRouter } from 'react-router-dom';

class App extends Component {
	componentWillMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(connect(null,actions)(App));