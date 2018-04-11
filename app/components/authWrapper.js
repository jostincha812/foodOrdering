import React, { Component } from 'react';
import firebase from 'react-native-firebase';

export default class AuthWrapper extends Component {

	constructor() {
		super();
		this.unsubscriber = null;
	}

	state = {
		user: null,
	}

	componentDidMount() {
		this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
			this.setState({ user });
		});
	}
	
	componentWillUnmount() {
		if (this.unsubscriber) {
			this.unsubscriber();
		}
	}

	render () {
		if (!this.state.user) {
			return <Login />;
		}
	
		return (
			<PrivateRoute/>
		);
	}
}