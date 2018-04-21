import React, { Component } from 'react';
import { Modal, View, Text, Image } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation';

import NavBar from '../navBar';
import BottomButton from '../bottomButton';
import CustomList from '../customList';

import styles from './styles';
import placeholder from '../../assets/placeholder.png';

const DELIVERY_FEE = 10;

export default class CartModal extends Component {
  
  state = {
    orderPlaced : false
  }
  
  onCheckout = () => {
    // TODO: API CALL TO ADD RECORDS
    this.setState( { orderPlaced : true } )
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
    const {  cartData, total, restaurantData } = this.props;
    
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

  render(){
    const { orderPlaced } = this.state;
    const { showCart } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={ false }
        visible={ showCart }
        onRequestClose={ this.handleBackPress}
      >  
        {
          orderPlaced ? this.renderOrderSuccess() : this.renderCart()
        }
      </Modal>
    )
  }
};