import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

export default class AboutUs extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}
	render() {
		return (
			<Container>
				<Content>
					<Text>AboutUs</Text>
				</Content>
			</Container>
		)
	}
}