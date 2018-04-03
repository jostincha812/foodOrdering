import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';

export default class SignUp extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}

	render() {
		return (
			<Container>
				<Content>
					<Text>Signup</Text>
				</Content>
			</Container>
		)
	}
}