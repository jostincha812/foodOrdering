import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import styles from './styles';
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
				<Content style={styles.aboutUsContainer}>
					<Text>
						This application is a senior project that is done by Alyamamah students.
						It aims to make instagram shopping easier for consumers.
					</Text>
				</Content>
			</Container>
		)
	}
}