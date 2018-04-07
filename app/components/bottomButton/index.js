import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard  } from 'react-native';

import styles from './style';

export default class BottomButton extends Component {
  
  state = {
    isHidden : false
  };
  
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  };
  
  _keyboardDidShow = () => {
    this.setState( { isHidden : true } );
  };
  
  _keyboardDidHide = () => {
    this.setState( { isHidden : false } );
  };
  
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };
  
  render () {
    const { onPress, buttonText, disabled } = this.props;
    
    if ( this.state.isHidden ) return null;
    
    return (
      <TouchableOpacity 
        onPress={ onPress }
        activeOpacity={ disabled ? 1 : 0.8 }
        style={styles.bottomButton}
      >
        <Text style={styles.textStyle}>{ buttonText }</Text>
      </TouchableOpacity>
    )
  }
};