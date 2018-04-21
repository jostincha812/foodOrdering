import React, { Component } from 'react';
import { RefreshControl, Alert, Image, View, Text, TouchableOpacity, Linking } from 'react-native';
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
		cartData : [],
		showCart : false
	};

	componentDidMount () {
		const { navigation : { state : { params : { restaurantData } } } } = this.props;

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
	
	setCardData = ( foodObj ) => {
		const { cartData } = this.state;
		const { qty } = foodObj;
		
		if ( qty ) {
			const isAdded = cartData.findIndex( food => food.Id === foodObj.Id );
			
			if ( isAdded !== -1 ) {
				cartData[ isAdded ] = foodObj;
			} else {
				cartData.push( foodObj );
			}
			
			this.setState( { cartData } );

		} else {
			const newCartData = cartData.filter( food => food.Id !== foodObj.Id );
			
			this.setState( { cartData: newCartData } )
		}
		console.log("FOOD OBJ::",foodObj);
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
						addToCart={ this.setCardData }
					/>
				</View>
			</View>
		)
	}
	
	toggleCart = ( showCart ) => {
		this.setState( { showCart } )
	}
	
	render() {
		const { loading, isRefreshing, data, restaurantData, cartData } = this.state;
		
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
					cartData.length ?
					<BottomButton
					buttonText="Go to cart"
					onPress={ () => { this.toggleCart( true ); } }
				/>
				: <View/>
			}
			</Container>
		)
	}
}