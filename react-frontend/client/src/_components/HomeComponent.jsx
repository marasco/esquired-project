import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const user = Cookies.get('user');
const email = Cookies.get('email');

export default class HomeComponent extends Component {


	render() {
		return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello {user}</h1>
                <p>Welcome to ESQUIRED</p>
                <p><Link className="btn btn-primary" to="/login">Logout from {email}</Link></p>
            </div>
		);
	}
}


export { HomeComponent };