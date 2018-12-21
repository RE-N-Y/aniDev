import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div>
				<Link to="/">ANIPIN</Link>
				<Link to="/signup">Sign Up</Link>
				<Link to="/signin">Sign In</Link>
				<a href="http://localhost:5000/logout">Log Out</a>
				<Link to="/profile">Profile</Link>
			</div>
		);
	}
}

export default Header;