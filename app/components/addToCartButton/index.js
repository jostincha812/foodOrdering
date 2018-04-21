import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
  
  addToCart = ( ) => {
    const { qty } = this.state;
    const { foodData } = this.props;
    const foodObj = {
      ...foodData,
      qty
    }
    
    this.props.addToCart( foodObj );
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