import React, { Component } from 'react';
import { Modal, View, Text, Image, Alert, AsyncStorage } from 'react-native';
import { Container, Content, Icon, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

import NavBar from '../navBar';
import BottomButton from '../bottomButton';
import CustomList from '../customList';
import CustomTextInput from '../customTextInput';

import styles from './styles';
import placeholder from '../../assets/placeholder.png';
import { colors } from '../../theme';


const DELIVERY_FEE = 10;

export default class CartModal extends Component {
  
  state = {
    orderPlaced : false,
    deliveryAddress : '',
    userId : '',
    mobile : '',
    loading : false
  }
  
  onCheckout = () => {
    const { deliveryAddress } = this.state;
    if( !deliveryAddress ) {
      Alert.alert('Checkout','Please enter your delivery address',
        [
          { text : 'OK' }
        ]
      );
    }
    else this.getUserId();
  }

  getUserId = () => {
    this.setState({ loading : true }, () => {
      AsyncStorage.getItem("uid")
      .then((value) => {
        this.setState( { userId : value } , () => {
          this.getUserPhoneNo();
        } );
      })
      .catch(err => {
        console.log('AsyncStorage get userId error :: ', err);
        this.someThingWentWrong();
      });
    });
  }

  getUserPhoneNo = () => {
    const { userId } = this.state;
    firebase.firestore().collection('users').where( 'userId' , '==' , userId ).get().then((documentSnapshot) => {
      documentSnapshot.forEach((doc) => {
        let data = doc.data();
        this.setState( { mobile : data.mobile_no }, () => {
          this.placeOrder();
        } );
      });
    }, err => {
      console.log('user details get error :: ', err);
      this.someThingWentWrong();
    });
  }

  placeOrder = () => {
     const { deliveryAddress, userId, mobile } = this.state;
     const { cartData, total, restaurantData : { Id } } = this.props;
     const objToSend = {
       userId,
       mobile,
       deliveryAddress,
       totalAmount : total
     };
     const foodItems = [];
     cartData.forEach( item => {
        foodItems.push( {
          Id : item.Id,
          name : item.name,
          qty : item.qty,
        } )
     } );
     objToSend.foodItems = foodItems;
     this.addOrderToFirebase(objToSend,Id);
  }

  addOrderToFirebase = ( data, restaurantId ) => {
    firebase.firestore().collection(`restaurants/${restaurantId}/orders`).add(data)
    .then( response => {
      this.setState( { orderPlaced : true, loading : false } );
    }, err => {
      console.log('addOrderToFirebase error :: ', err);
      this.someThingWentWrong();
    } );
  }

  someThingWentWrong = () => {
    this.setState({ loading : false }, () => {
      Alert.alert('Checkout','Something went wrong please try again.',
        [
          { text : 'OK' }
        ]
      );
    });
  }
  
  handleBackPress = ( ) => {
    const { orderPlaced } = this.state;
    
    if ( orderPlaced ) 
      this.goToRestaurants();

    else
    this.props.toggleCart( false );
  }
  
  goToRestaurants = () => { this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [ NavigationActions.navigate({ routeName: 'RestaurantList' }) ]
    }))
  }
  
  
  getItems = ( item ) => (
    <View style={ styles.foodContainer }>
      <Image
        source={ item.image ? { uri : item.image } : placeholder }
        style={ styles.foodImage }
      />
      <View style={ styles.foodDetailsContainer }>
        <Text style={ styles.foodName }>{ item.name }<Text style={styles.qtyText}> X{ item.qty }</Text></Text>
      </View>
      <View style={ styles.rateContainer }>
        <Text style={ styles.rateText }>SAR { item.rate }</Text>
      </View>
    </View>
  )
  
  renderCart () {
    const { cartData, total, restaurantData } = this.props;
    
    return (
      <Container>
        <NavBar
          leftIcon="ios-arrow-back"
          leftIconPress={ this.handleBackPress }
          title="Cart"
        />
        <Content>
          <View style={ styles.restaurantContainer }>
            <Image
              source={ restaurantData.image ? { uri : restaurantData.image } : placeholder }
              style={ styles.restaurantImage }
            />
            <Text style={ styles.restaurantHeader } >{ restaurantData.name }</Text>
          </View>
          <View style={ styles.yourOrderContainer }>
            <Text style={ styles.yourOrderText }>Your Orders</Text>
          </View>
          <CustomList
            data={ cartData }
            renderRow={ this.getItems }
          />
          <View style={ styles.costSplitContainer}>
            <View style={ styles.costSplitDetails }>
              <Text style={ styles.leftText }>Subtotal</Text> 
              <Text style={ styles.rightText }>SAR {total}</Text>
            </View>
            <View style={ styles.costSplitDetails }>
              <Text style={ styles.leftText }>Delivery Fee</Text> 
              <Text style={ styles.rightText }>SAR { DELIVERY_FEE }</Text>
            </View>
          </View>
          <View style={ styles.totalContainer}>
            <Text style={styles.leftText}>Total</Text>
            <Text style={ styles.totalText } >SAR { parseFloat( total ) + DELIVERY_FEE }</Text>
          </View>
          <View style={ styles.addressContainer}>
            <CustomTextInput 
              placeholder="Enter your delivery address"
              value={ this.state.deliveryAddress }
              onChange={ val => this.setState({ deliveryAddress : val }) }
            />
          </View>
        </Content>
        <BottomButton
          buttonText="Place Order"
          onPress={ this.onCheckout }
        />
      </Container>
    )
  }
  
  renderOrderSuccess () {
    return (
      <Container>
				<Content contentContainerStyle={ styles.publicBackground }>
					<Icon
						name="ios-checkmark-circle"
						style={ styles.successIcon }
					/>
					<Text style={ styles.successText }>Order Success!</Text>
          <Text>Your order will be delivered within in 45 mins.</Text>
				</Content>
        <BottomButton
          buttonText="Go to Home"
          onPress={ this.handleBackPress } 
        />
			</Container>
    )
  }

  renderLoader () {
    return (
      <View style={ styles.loader }>
        <Spinner color={colors.red} />
        <Text style={ styles.successText }>Processing your order...</Text>
      </View>
    )
  }

  render(){
    const { orderPlaced, loading } = this.state;
    const { showCart } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={ false }
        visible={ showCart }
        onRequestClose={ this.handleBackPress}
      >  
        { loading ? this.renderLoader() :
          ( orderPlaced ? this.renderOrderSuccess() : this.renderCart() )
        }
      </Modal>
    )
  }
};