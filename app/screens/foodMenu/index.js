import React, { Component } from 'react';
import { RefreshControl, Alert, Image, View, Text, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';
import AddToCartButton from '../../components/addToCartButton';
import BottomButton from '../../components/bottomButton';
import styles from './styles';

import placeholder from '../../assets/placeholder.png';

export default class FoodMenu extends Component {
	static navigationOptions = {
		header : null,
		drawerLockMode: 'locked-closed'
	}
	
	state = {
		loading : false,
		isRefreshing : false,
		restaurantData : {},
		data : [],
		showCart : false
	};

	componentDidMount () {
		const { navigation : { state : { params : { restaurantData } } } } = this.props;
		AsyncStorage.removeItem( 'cartData' );
		this.setState({
			restaurantData : { ...restaurantData }
		}, this.fetchMenu );
	}
		
	fetchMenu = ( isRefreshing ) => {
		const { restaurantData } = this.state;
		
		this.setState( { 
			loading : isRefreshing ? false : true,
			isRefreshing : isRefreshing || false
		 } );
		 
		 firebase.firestore().collection(`restaurants/${restaurantData.Id}/foodMenu`).onSnapshot((documentSnapshot) => {
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
			Alert.alert('Food Menu','Oops.. Something went wrong, Please try again',
				[
					{ text : 'OK' }
				]
			);
		});

	}
	
	getMenu = ( item ) => {
		return(
			<View style={ styles.foodContainer }>
				<Image
					source={ item.image ? { uri : item.image } : placeholder }
					style={ styles.foodImage }
				/>
				<View style={ styles.foodDetailsContainer }>
					<Text style={ styles.foodName }>{item.name}</Text>
					<Text style={ styles.rateText }>SAR { item.rate }</Text>
				</View>
				<View style={ styles.addToCartContainer}>
					<AddToCartButton 
						foodData={ item }
						showCart={ showCart => { this.setState( { showCart } ) }}
					/>
				</View>
			</View>
		)
	}
	
	render() {
		const { loading, isRefreshing, data, restaurantData, showCart } = this.state;
		
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
					<View style={ styles.restaurantContainer } >
						<Image
							defaultSource={ placeholder }
							source={ restaurantData.image ? { uri : restaurantData.image } : placeholder }
							style={ styles.restaurantImageStyle }
						/>
						<View style={ styles.textContainer }/>
						<Text style={ styles.restaurantName }>{ restaurantData.name }</Text>
						{ restaurantData.phone ? 
							<TouchableOpacity 
								onPress={ () => { Linking.openURL(`tel:${restaurantData.phone}`); } } 
								style={ styles.phoneContainer } 
							>
								<Icon name="call" style={ styles.phoneIcon } />	
							</TouchableOpacity>
						 : <View style={ styles.phoneContainer }/>
					 }
					</View>
					<CustomList 
						loading={ loading }
						data={ data }
						renderRow={ this.getMenu }
					/>
				</Content>
				{
					showCart ?
					<BottomButton
					buttonText="Go to cart"
					onPress={ () => { console.log("CART:::");} }
				/>
				: <View/>
			}
			</Container>
		)
	}
}