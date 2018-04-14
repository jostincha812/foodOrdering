import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import NavBar from '../../components/navBar';

export default class AboutUs extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}
	render() {
		return (
			<Container>
				<NavBar
					leftIcon="menu"
					leftIconPress={ () => this.props.navigation.navigate('DrawerOpen') }
					title="About Us"
				/>
				<Content>
					<Text>AboutUs</Text>
				</Content>
			</Container>
		)
	}
}