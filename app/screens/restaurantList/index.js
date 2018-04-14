import React, { Component } from 'react';
import { RefreshControl, Image, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content , Card, CardItem, ListItem } from 'native-base';
import firebase from 'react-native-firebase';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';
import styles from './styles';
import { mainStyles } from '../../theme';

import placeholder from '../../assets/placeholder.png';

export default class RestaurantList extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false,
	}

	state = {
		data    : [],
		loading : false,
		isRefreshing : false
	}

	componentDidMount () {
		this.fetchRestaurants();
	}

	fetchRestaurants = ( isRefreshing ) => {
		this.setState( { 
			loading : isRefreshing ? false : true,
			isRefreshing : isRefreshing || false
		 } );
		firebase.firestore().collection('restaurants').onSnapshot((documentSnapshot) => {
			let resultData = [];
			documentSnapshot.forEach((doc) => {
				let data = doc.data();
				data.Id = doc.id;
				resultData.push(data);
			});
			console.log('resultData ::::::: ', resultData);
			this.setState( { data : resultData, loading : false, isRefreshing : false } );
		}, err => {
			this.setState( { loading : false } );
			Alert.alert('Restaurants','Oops.. Something went wrong, Please try again',
				[
					{ text : 'OK' }
				]
			);
		});
	}
	
	getRestaurant = ( item ) => {
			return (
				<TouchableOpacity
					onPress={ () => { 
										this.props.navigation.navigate('FoodMenu',{
											restaurantId : item.Id,
											name : item.name
										}) 
									}}
					 style={ styles.itemContainerStyle }
					 >
					<View style={ styles.restaurantNameContainer }>
						<Text style={ styles.restaurantName }>{ item.name }</Text>
					</View>
					<Image
						defaultSource={ placeholder }
						source={ item.image ? { uri : item.image} : placeholder }
						style={ styles.restaurantImageStyle }
					/>
					<View style={ styles.addressContainer } >
						<Text style={ styles.addressText }>{item.address}</Text>
					</View>
				</TouchableOpacity>
			)
	}

	render() {
		const { loading, isRefreshing, data } = this.state;
		return (
			<Container>
				<NavBar
					leftIcon="menu"
					leftIconPress={ () => this.props.navigation.navigate('DrawerOpen') }
					title="Restaurants"
				/>
				<Content 
					refreshControl={
						<RefreshControl
							refreshing={ isRefreshing }
							onRefresh={ () => { this.fetchRestaurants( true ) } }
						/>
					}
				>
					<CustomList 
						loading={ loading }
						data={ data }
						renderRow={ this.getRestaurant }
					/>
				</Content>
			</Container>
		)
	}
}