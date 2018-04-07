import React, { Component } from 'react';
import { Alert, View, Image, TouchableOpacity, ActivityIndicator, StatusBar  } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';

import { mainStyles,colors } from '../../theme';
import styles from './styles';
import logo from '../../assets/logo.png';
import ProgressButton from '../../components/progressButton';
import BottomButton from '../../components/bottomButton';
import CustomTextInput from '../../components/customTextInput';


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
	
	state = {
		email : '',
		password : '',
		loading : false,
		errors : {
			email : '',
			password : ''
		}
	};

	loginPressed = () => {
		if ( !this.validateForm() ) return;
		
		this.setState( { loading : true } );

		firebase.auth().signInWithEmailAndPassword( this.state.email, this.state.password ).then( ( data ) => {
		this.setState( { loading : false } );
		this.props.navigation.navigate( 'Home' );
		}, err => {
			this.setState( { loading : false } );
			Alert.alert('Login',loginErrorMessages[err.code],
				[
					{ text : 'OK' }
				]
			);
		});
	};
	
	validateForm = () => {
		let valid = false;
		const { errors } = this.state;
		
		valid = !!this.state.email;
		valid = valid ? !!this.state.password : valid;
		
		errors.email = !this.state.email ? 'Required' : '';
		errors.password = !this.state.password ? 'Required' : '';
		
		this.setState( { errors } );
		
		return valid;
	}
	
	onRegister = () => {
		if ( this.state.loading ) return;
		this.props.navigation.navigate( 'SignUp' );
	};

	render() {
		const { loading, errors = {} } = this.state;

		return (
			<Container>
				<StatusBar
			     backgroundColor={colors.themeWhite}
			     barStyle="dark-content"
			   />
				<Content contentContainerStyle={ {...mainStyles.publicBackground, flex : 1 } }>	
					<Image
						source={logo}
						style={mainStyles.logoStyle}
					/>
					<Text style={mainStyles.appName}>Food App</Text>
					<CustomTextInput 
						type="email"
						placeholder="Email"
						value={ this.state.email }
						onChange={ email => this.setState( { email } ) }
						error={ errors.email }
					/>
					<CustomTextInput 
						type="password"
						placeholder="Password"
						value={ this.state.password }
						onChange={ password => this.setState( { password } ) }
						error={ errors.password }
					/>
					<ProgressButton 
						round
						loading={ loading }
						buttonText="Login"
						onPress={ this.loginPressed } 
					/>
				</Content>
				<BottomButton 
					disabled={ loading }
					onPress={ this.onRegister }
					buttonText="Don't have an account yet?"
				/>
			</Container>
		)
	}
}