import React, { Component } from 'react';
import { Modal, View, Text, Image, Alert, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Icon, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import base64 from 'base-64';

import NavBar from '../navBar';
import BottomButton from '../bottomButton';
import CustomList from '../customList';
import CustomTextInput from '../customTextInput';
import ProgressButton from '../progressButton';

import styles from './styles';
import placeholder from '../../assets/placeholder.png';
import { colors } from '../../theme';
import { checkInternetConnection, createMailContent } from '../../utils';


const DELIVERY_FEE = 10;

export default class CartModal extends Component {
  
  state = {
    orderPlaced : false,
    deliveryAddress : '',
    loading : false,
    showAddressEditor : false
  };
  
  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillReceiveProps ( { address }) {
    const lastProps = this.props;
    if( lastProps.address !== address )
      this.setState({ deliveryAddress : address });
  }
  
  _keyboardDidHide = () => {
    this.setState( { showAddressEditor : false } );
  }
  
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
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
    else this.placeOrder();
  }

  placeOrder = () => {
    checkInternetConnection( this.placeOrderFirebaseCall, this.placeOrder );
  }

  placeOrderFirebaseCall = () => {
     const { deliveryAddress } = this.state;
     this.setState( { loading : true } );
     const { cartData, total, restaurantData : { Id }, userId, mobile } = this.props;
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
      this.sendEmail();
    }, err => {
      console.log('addOrderToFirebase error :: ', err);
      this.someThingWentWrong();
    } );
  }

  sendEmail = () => {
    const { userName, userEmail, mobile, address, restaurantData, cartData } = this.props;
    const { email } = restaurantData;
    const mailContent= createMailContent(userName, userEmail, mobile, address, restaurantData, cartData );
    fetch('https://api.mailgun.net/v3/sandboxfaec60aa390e4656a4b2dbc18db3ec35.mailgun.org/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64.encode("api:key-b86f7c38477601411ef113585ac78114")
      },
      body: `from=${userName}<${userEmail}>&to=${email}&subject=New Order&html=${mailContent}`
    })
    .then( response => {
      this.setState( { orderPlaced : true, loading : false } );
    } )
    .catch( err => {
      console.log('Send Email error :::::::::: ', response);
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
    const { orderPlaced, loading } = this.state;
    
    if ( loading )
      return;
    
    else if ( orderPlaced ) 
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
  
  addressComponent = () => {
    const { deliveryAddress , showAddressEditor } = this.state;
    
    if ( showAddressEditor ) {
      return (
        <CustomTextInput
          autoFocus={ true }
          placeholder="Enter your delivery address"
          value={ deliveryAddress }
          onChange={ deliveryAddress => this.setState( { deliveryAddress } ) }
          returnKeyType="done"
          onSubmitEditing={ () => { this.setState({ showAddressEditor : false }); } } 
        />
      )
    }
    
    return (
      <TouchableOpacity 
        style={ styles.addressContainer }
        onPress={ () => { 
          this.setState( { showAddressEditor : true } );
         } }
        >
        {
          deliveryAddress ? 
          <Text style={ styles.addressText } numberOfLines={ 1 }>
            { deliveryAddress }
          </Text>
          :
          <Text>Enter your delivery address</Text>
      }
        <View style={ styles.editAddressContainer }>
          <Icon name="md-create" style={ styles.editAddressIcon }/>
        </View>
      </TouchableOpacity>
    )
  }
  
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
            <Text style={ styles.toText }>To</Text>
            { this.addressComponent() }
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