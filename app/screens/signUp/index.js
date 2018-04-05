import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Button, Text } from 'native-base';
import Content from '../../components/centerContent';
import firebase from 'react-native-firebase';

const signUpErrorMessages = {
	'auth/invalid-email'  : 'Invalid email address entered.',
	'auth/user-disabled'  : 'User is disabled. Please contact your administrator.',
	'auth/user-not-found' : 'Invalid User. Please make sure your email id is registered.',
	'auth/wrong-password' : 'Wrong Password entered.',
	'auth/weak-password'  : 'Password should contain atleat 6 characters.',
	'auth/email-already-in-use' : 'Email is already registered.'
};

export default class SignUp extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}

	registerPressed = () => {
		const signUpObj = {
			email : 'sample@gmail.com',
			password : '123456',
			first_name : 'sample',
			last_name : 'sample',
			mobile_no : '1234567890'
		};
		firebase.auth().createUserWithEmailAndPassword( signUpObj.email, signUpObj.password ).then( ( data ) => {
			this.props.navigation.navigate( 'Home' );
			}, err => {
				console.log(' error :::::::: ', err.code );
				Alert.alert('Sign Up', signUpErrorMessages[err.code] ,
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
					<Button onPress={ this.registerPressed }>
						<Text>Register</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}