import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';

const loginErrorMessages = {
	'auth/invalid-email'  : 'Invalid email address entered.',
	'auth/user-disabled'  : 'User is disabled. Please contact your administrator.',
	'auth/user-not-found' : 'Invalid User. Please make sure your email id is registered.',
	'auth/wrong-password' : 'Wrong Password entered.'
};

export default class Login extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}

	loginPressed = () => {
		const user_name = 'rssuresh2@gmail.com';
		const password = 'qwerty';
		firebase.auth().signInWithEmailAndPassword( user_name, password ).then( ( data ) => {
		this.props.navigation.navigate( 'Home' );
		}, err => {
			Alert.alert('Login',loginErrorMessages[err.code],
				[
					{ text : 'OK' }
				]
			);
		});
	}

	render() {
		return (
			<Container>
				<Content>
					<Button onPress={ this.loginPressed }>
						<Text>Login</Text>
					</Button>
					<Button onPress={ () => this.props.navigation.navigate( 'SignUp' ) }>
						<Text>SignUp</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}