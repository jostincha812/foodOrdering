import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';

export default class Login extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}

	render() {
		return (
			<Container>
				<Content>
					<Button onPress={ () => this.props.navigation.navigate( 'Home' ) }>
						<Text>Login</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}