import React, { Component } from 'react';
import { Alert, Image, View, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import { mainStyles,colors } from '../../theme';
import styles from './styles';
import logo from '../../assets/logo.png';
import PersonalDetails from './components/personalDetails';
import AddressDetails from './components/addressDetails';

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
	
	state = {
		showPersonalDetails : true,
		personalObj : {},	
		loading : false	
	};
	
	onNext = ( personalObj ) => {
		Keyboard.dismiss();
		this.setState( {
			showPersonalDetails : false,
			personalObj
		} );
	}
	
	onBack = () => {
		Keyboard.dismiss();
		this.setState( { showPersonalDetails : true } );
	}
	
	registerPressed = ( addressObj ) => {
		const signUpObj = {
			...this.state.personalObj,
			...addressObj
		}
		delete signUpObj.password;
		
		this.setState( { loading : true } );

		firebase.auth().createUserWithEmailAndPassword( this.state.personalObj.email, this.state.personalObj.password ).then( ( data ) => {
			signUpObj.userId = data.toJSON().uid;
			firebase.firestore().collection('users').add(signUpObj);
			this.setState( { loading : false } );
			this.props.navigation.navigate( 'Home' );
			}, err => {
				console.log(' error :::::::: ', err.code );
				this.setState( { loading : false } );
				Alert.alert('Sign Up', signUpErrorMessages[err.code] ,
					[
						{ text : 'OK' }
					]
				);
		});
	};
	
	onClose = () => {
		if ( this.state.loading ) return;
		
		if ( !this.state.showPersonalDetails ) {
			this.setState( { showPersonalDetails : true } );
			return;
		}
		
		this.props.navigation.goBack();
	};

	render() {
		return (
			<Container>
				<Content contentContainerStyle={mainStyles.publicBackground}>	
					<TouchableOpacity 
						style={ styles.closeButtonContainer } 
						activeOpacity={ this.state.loading ? 1 : 0.2 }
						onPress={ this.onClose }>
						<Icon 
							name={ this.state.showPersonalDetails ? 'close' : 'ios-arrow-back' }
						/>
					</TouchableOpacity>
						<Image
							source={logo}
							style={mainStyles.logoStyle}
						/>
						<Text style={mainStyles.appName}>Food App</Text>
							<View style={ this.state.showPersonalDetails ? mainStyles.widthAll : mainStyles.hidden }>
								<PersonalDetails onNext={ this.onNext } /> 
							</View>
							<View style={ !this.state.showPersonalDetails ? mainStyles.widthAll : mainStyles.hidden }>
								<AddressDetails onBack={ this.onBack } onSave={ this.registerPressed } loading={ this.state.loading } />
							</View>
				</Content>
			</Container>
		)
	}
}