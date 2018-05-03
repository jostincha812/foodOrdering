import React, { Component } from 'react';
import { RefreshControl, Image, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content , Card, CardItem, ListItem } from 'native-base';
import firebase from 'react-native-firebase';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';
import SearchBar from '../../components/searchBar';
import styles from './styles';
import { mainStyles } from '../../theme';
import { makeCopy, checkInternetConnection } from '../../utils';

import placeholder from '../../assets/placeholder.png';

export default class RestaurantList extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false,
	}

	state = {
		rawData : [],
		data    : [],
		loading : false,
		isRefreshing : false
	}

	componentDidMount () {
		this.fetchRestaurants();
	}

	fetchRestaurants = ( isRefreshing=false ) => {
		checkInternetConnection( () => this.fetchRestaurantsFirebaseCall( isRefreshing ), this.fetchRestaurants );
	}

	fetchRestaurantsFirebaseCall = ( isRefreshing ) => {
		this.setState( { 
			loading : isRefreshing ? false : true,
			isRefreshing : isRefreshing
		 } );
		firebase.firestore().collection('restaurants').onSnapshot((documentSnapshot) => {
			let resultData = [];
			documentSnapshot.forEach((doc) => {
				let data = doc.data();
				data.Id = doc.id;
				resultData.push(data);
			});

			this.setState( { 
				rawData : resultData,
				data : resultData, 
				loading : false, 
				isRefreshing : false
			 } );
		}, err => {
			this.setState( { loading : false } );
			Alert.alert('Restaurants','Oops.. Something went wrong, Please try again',
				[
					{ text : 'OK' }
				]
			);
		});
	}
	
	onSearch = ( search_text ) => {
		const { rawData } = this.state;
		
		if ( !search_text ) {
			this.setState( { data : makeCopy( rawData ) } );
			return;
		}
		
		const data = makeCopy( rawData ).filter( restaurant => restaurant.name.toLowerCase().match( search_text.toLowerCase() ) );
		
		this.setState( { data } );
	}
	
	getRestaurant = ( item ) => {
			return (
				<TouchableOpacity
					onPress={ () => { 
						this.props.navigation.navigate('FoodMenu',{
							restaurantData : item
						}) 
					}}
					activeOpacity={ 0.8 }
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
						<Text style={ styles.addressText }>{item.address ? item.address : item.description}</Text>
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
				<SearchBar 
					onSearch={ this.onSearch }
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