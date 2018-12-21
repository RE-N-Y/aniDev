import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div>
				<Link to="/">Auth</Link>
				<Link to="/signup">Sign Up</Link>
				<Link to="/signin">Sign In</Link>
				<Link to="/logout">Logout</Link>
				<Link to="/profile">Profile</Link>
			</div>
		);
	}
}

export default Header;