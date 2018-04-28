import React, { Component } from 'react';
import { RefreshControl, Alert, Image, View, Text, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';
import AddToCartButton from '../../components/addToCartButton';
import BottomButton from '../../components/bottomButton';
import CartModal from '../../components/cartModal';

import styles from './styles';
import { mainStyles } from '../../theme';
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
		showCart : false,
		total : 0,
		userId : '',
		mobile : '',
		address : ''
	};

	componentDidMount () {
		const { navigation : { state : { params : { restaurantData } } } } = this.props;

		this.setState({
			restaurantData : { ...restaurantData }
		}, this.fetchMenu );
	}

	someThingWentWrong = () => {
		this.setState({ loading : false }, () => {
		Alert.alert('Food Menu','Oops.. Something went wrong please try again.',
			[
				{ text : 'OK' }
			]
		);
		});
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
				isRefreshing : false
			}, () => this.getUserId() );
		}, err => {
			console.log("Fetch food menu err :", err);
			this.someThingWentWrong();
		});

	}

	getUserId = () => {
		AsyncStorage.getItem("uid")
			.then((value) => {
			this.setState( { userId : value } , () => {
				this.getUserDetails();
			} );
		})
		.catch(err => {
			console.log('AsyncStorage get userId error :: ', err);
			this.someThingWentWrong();
		});
	}
	
	getUserDetails = () => {
		const { userId } = this.state;
		firebase.firestore().collection('users').where( 'userId' , '==' , userId ).get().then((documentSnapshot) => {
		documentSnapshot.forEach((doc) => {
			let data = doc.data();
			this.setState( {
				mobile : data.mobile_no,
				address : data.address,
				loading : false
			} );
		});
		}, err => {
		console.log('user details get error :: ', err);
		this.someThingWentWrong();
		});
	}
	
	setCartData = ( foodObj ) => {
		const { cartData } = this.state;
		const { qty } = foodObj;
		
		if ( qty ) {
			const isAdded = cartData.findIndex( food => food.Id === foodObj.Id );
			
			if ( isAdded !== -1 ) {
				cartData[ isAdded ] = foodObj;
			} else {
				cartData.push( foodObj );
			}
			
			this.setState( { cartData }, this.setTotal );

		} else {
			const newCartData = cartData.filter( food => food.Id !== foodObj.Id );
			
			this.setState( { cartData: newCartData }, this.setTotal )
		}
	}
	
	setTotal = ( ) => {
		const { cartData } = this.state;
		
		const total = cartData.reduce( ( total, food ) => {
			total = total + ( food.qty * food.rate );
			return total;
		}, 0 )
		
		this.setState( { total : total.toFixed( 2 ) } );
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
						addToCart={ this.setCartData }
					/>
				</View>
			</View>
		)
	}
	
	toggleCart = ( showCart ) => {
		this.setState( { showCart } );
	}
	
	render() {
		const {
			loading,
			isRefreshing,
			data,
			restaurantData,
			cartData,
			showCart,
			total,
			address,
			mobile,
			userId
		} = this.state;
				
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
						<Text style={ styles.restaurantName } numberOfLines={ 1 }>{ restaurantData.name }</Text>
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
					<View style={ cartData.length ? mainStyles.handleBottomButton : {}}/>
				</Content>
				{
					cartData.length ?
					<BottomButton
						buttonText={ `Go to Cart ( SAR ${total} )` }
						onPress={ () => { this.toggleCart( true ); } }
					/>
					: <View/>
				}
			<CartModal 
				showCart={ showCart }
				toggleCart={ this.toggleCart }
				cartData={ cartData }
				total={ total }
				address={ address }
				mobile={ mobile }
				userId={ userId }
				restaurantData={ restaurantData }
				navigation={ this.props.navigation }
			/>
			</Container>
		)
	}
}