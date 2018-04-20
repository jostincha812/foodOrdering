import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'native-base';

import styles from './styles';

export default class AddToCartButton extends Component {
  state = {
    qty : 0
  }
  
  onAdd = (  ) => {
      let { qty } = this.state;
      qty = qty+1;

      this.setState( { qty }, this.addToCart );
  }
  
  onSubtract = () => {
    let { qty } = this.state;
    qty = qty-1;

    this.setState( { qty }, this.addToCart );
  }
  
  addToCart = async ( ) => {
    const { qty } = this.state;
    const { foodData } = this.props;

    try {
      const cartDetails = await AsyncStorage.getItem( 'cartData' );
      const cartData = cartDetails ? JSON.parse( cartDetails ) : cartDetails;
      const isAdded = cartDetails ? cartData.find( item => item.id === foodData.Id ) : false;
      if ( cartData && cartData.length ) {
        if ( qty && !isAdded ) {
             cartData.push({
              id : foodData.Id,
              name : foodData.name,
              rate : foodData.rate,
              qty 
          });
                    
          await AsyncStorage.setItem('cartData', JSON.stringify( cartData ) );
          this.props.showCart( true );
        } else if ( qty ) {
          const newCartData = cartData.map( item => {
            if ( item.id === foodData.Id ) item.qty = qty;
            
            return item;
          });

          await AsyncStorage.setItem('cartData', JSON.stringify( newCartData ) );
          this.props.showCart( true );
        } else {
          const newCartData = cartData.filter( item => item.id !== foodData.Id );

          await AsyncStorage.setItem('cartData', JSON.stringify( newCartData ) );
          this.props.showCart( newCartData.length );
        }
      } else {
        const foodObj = [{
          id : foodData.Id,
          name : foodData.name,
          rate : foodData.rate,
          qty 
        }];

        await AsyncStorage.setItem('cartData', JSON.stringify( foodObj ) );
        this.props.showCart( true );
      }
    } catch ( error ) {
      console.log("ERR::",error)
    }
  }
  
  render() {
    const { qty } = this.state;

    if ( !qty )
      return(
        <TouchableOpacity style={ styles.container } onPress={ this.onAdd }>
          <View style={ styles.textContainer }>
            <Text style={ styles.addText }>Add</Text>
          </View>
        </TouchableOpacity>
      );
      
    return (
      <View style={ styles.container }>
        <TouchableOpacity onPress={ this.onAdd } style={ styles.buttonStyle }>
          <Icon name="add" style={ styles.iconStyle } />
        </TouchableOpacity>
        <View style={ styles.textContainer }>
          <Text style={ styles.addText }>{ qty }</Text>
        </View>
        <TouchableOpacity style={ styles.buttonStyle } onPress={ this.onSubtract }>
          <Icon name="remove" style={ styles.iconStyle } />
        </TouchableOpacity>
      </View>
    );
  }
};