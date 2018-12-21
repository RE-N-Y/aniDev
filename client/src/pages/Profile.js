import React, { Component } from 'react';
import requireAuth from './../components/requireAuth';
import { connect } from 'react-redux';
import * as actions from './../actions';

class Profile extends Component {
	render() {
		console.log(this.props.authenticated);
		return (
			<div>
				Profile
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps,actions)(requireAuth(Profile));