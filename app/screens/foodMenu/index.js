import React, { Component } from 'react';
import { RefreshControl, Alert } from 'react-native';
import { Container, Content, Text } from 'native-base';
import firebase from 'react-native-firebase';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';

export default class FoodMenu extends Component {
	static navigationOptions = {
		header : null,
		drawerLockMode: 'locked-closed'
	}
	
	state = {
		loading : false,
		isRefreshing : false,
		data : []
	};

	componentDidMount () {
		this.fetchMenu();
	}
		
	fetchMenu = ( isRefreshing ) => {
		this.setState( { 
			loading : isRefreshing ? false : true,
			isRefreshing : isRefreshing || false
		 } );

		const { navigation : { state : { params : { restaurantId } } } } = this.props;
		 firebase.firestore().collection(`restaurants/${restaurantId}/foodMenu`).onSnapshot((documentSnapshot) => {
			let resultData = [];
			documentSnapshot.forEach((doc) => {
				let data = doc.data();
				data.Id = doc.id;
				resultData.push(data);
			});
			console.log('resultData ::::::: ', resultData);
			this.setState( { 
				rawData : resultData,
				data : resultData, 
				loading : false, 
				isRefreshing : false
			 } );
		}, err => {
			this.setState( { loading : false } );
			Alert.alert('Food Menu','Oops.. Something went wrong, Please try again',
				[
					{ text : 'OK' }
				]
			);
		});

	}
	
	getMenu = ( item ) => {
		return <Text>Item</Text>
	}
	
	render() {
		const { loading, isRefreshing, data } = this.state;
		
		return (
			<Container>
				<NavBar
					leftIcon="ios-arrow-back"
					leftIconPress={ () => { this.props.navigation.goBack() } }
					title="Menu"
				/>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={ isRefreshing }
							onRefresh={ () => { this.fetchMenu( true ) } }
						/>
					}
				>
					<CustomList 
						loading={ loading }
						data={ data }
						renderRow={ this.getMenu }
					/>
				</Content>
			</Container>
		)
	}
}