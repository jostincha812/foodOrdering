import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from './styles';

export default class SearchBar extends Component {
  state = {
    search_text : ''
  }
  
  onClear = ( ) => {
    this.setState( { search_text : '' }, this.props.onSearch );
  }
  
  render () {
    const { search_text } = this.state;
    
    return(
      <View style={ styles.searchContainer }>
        <Icon name="search" style={ styles.iconStyle } />
        <TextInput 
          style={ styles.inputStyle }
          value={ search_text }
          onChangeText={ search_text => { this.setState( { search_text } ); } }
          placeholder="Search..."
          returnKeyType="search"
          onSubmitEditing={ () => { this.props.onSearch( search_text ); } } 
          underlineColorAndroid="transparent"
        />
        {
          search_text ?
          <TouchableOpacity onPress={ this.onClear }>
            <Icon name="times-circle" style={ styles.cancelStyle } type="FontAwesome"/>
          </TouchableOpacity>
          :
          <View/>
        }
      </View>
    )
  }
};