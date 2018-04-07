import React, { Component } from 'react';
import { Alert, View, Image, TextInput, TouchableOpacity, ActivityIndicator, StatusBar  } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';

import { mainStyles,colors } from '../../theme';
import styles from './styles';
import logo from '../../assets/logo.png';
import BottomButton from '../../components/bottomButton';


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
				<Content contentContainerStyle={mainStyles.publicBackground}>	
					<Image
						source={logo}
						style={mainStyles.logoStyle}
					/>
					<Text style={mainStyles.appName}>Food App</Text>
					
					<View style={mainStyles.widthAll}>
						<TextInput
							keyboardType="email-address"
							autoCapitalize="none"
							value={this.state.email}
							onChangeText={(email) => { this.setState( { email } ); }}
							style={mainStyles.widthAll}
							placeholder="Email"
							placeholderTextColor={colors.red}
							underlineColorAndroid={ colors.red }
						/>
						<Text style={mainStyles.errorText}>{ errors.email }</Text>
					</View>
					<View style={mainStyles.widthAll}>
						<TextInput
							value={this.state.password}
							onChangeText={(password) => { this.setState( { password } ); }}
							style={mainStyles.widthAll}
							placeholder="Password"
							placeholderTextColor={colors.red}
							secureTextEntry
							underlineColorAndroid={ colors.red }
						/>
						<Text style={mainStyles.errorText}>{ errors.password }</Text>
					</View>
					<View style={styles.loginContainer}>
						{ !loading ? 
								<TouchableOpacity 
									onPress={ this.loginPressed } 
									style={mainStyles.roundButton}
									activeOpacity={0.8}
								>
										<Text style={mainStyles.whiteText}>Login</Text>
								</TouchableOpacity>
							:
							<ActivityIndicator size="large" color={ colors.red } />
					 }
					</View>
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