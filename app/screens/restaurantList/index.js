import React, { Component } from 'react';
import { Container, Content, Button ,Text } from 'native-base';
import firebase from 'react-native-firebase';

export default class RestaurantList extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}

	state = {
		data    : [],
		loading : false
	}

	componentDidMount () {
		this.fetchRestaurants();
	}

	fetchRestaurants = () => {
		this.setState( { loading : true } );
		firebase.firestore().collection('restaurants').onSnapshot((documentSnapshot) => {
			let resultData = [];
			documentSnapshot.forEach((doc) => {
				let data = doc.data();
				data.Id = doc.id;
				resultData.push(data);
			});
			console.log('resultData ::::::: ', resultData);
			this.setState( { data : resultData, loading : false } );
		}, err => {
			this.setState( { loading : false } );
			Alert.alert('Restaurants','Oops.. Something went wrong, Please try again',
				[
					{ text : 'OK' }
				]
			);
		});
	}

	render() {
		return (
			<Container>
				<Content>
					<Button onPress={ () => this.props.navigation.navigate('FoodMenu') }>
						<Text>Restaurants</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}