import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

export default class Cart extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}
	render() {
		return (
			<Container>
				<Content>
					<Text>Cart</Text>
				</Content>
			</Container>
		)
	}
}