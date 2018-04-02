import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';

export default class Login extends Component {
	render() {
		return (
			<Container>
				<Content>
					<Button onPress={ () => this.props.navigation.navigate('Restaurants') }>
						Login
					</Button>
				</Content>
			</Container>
		)
	}
}