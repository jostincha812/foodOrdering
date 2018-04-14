import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import firebase from 'react-native-firebase';

import styles from './style'; 
import { colors } from '../../theme';
import logo from '../../assets/logo.png';

import { addSpaceBeforeCapital } from '../../utils';

class CustomDrawer extends Component {
  
  logout = () => {
    firebase.auth().signOut()
      .then(data => {
      })
      .catch(err => {
        console.log("ERR::",err)
      })
  };
  
  replaceScreen = ( routeName ) => {
    const { activeItemKey, navigation } = this.props;
    
    if ( routeName === activeItemKey ) return;

    navigation.navigate( routeName );
  }
  
  getMenuItems = ( ) => {
    const { activeItemKey, items } = this.props;

    return items.map( nav => (
      <TouchableHighlight
        underlayColor={ colors.darkRed }
        activeOpacity={ 0.5 }
        onPress={ () => { this.replaceScreen( nav.routeName ) } }
        style={ nav.key === activeItemKey ? styles.listActiveItemContainer : styles.listItemContainer } 
        key={ nav.key }
      >
        <Text style={ styles.navText }>{ addSpaceBeforeCapital( nav.routeName ) }</Text>
      </TouchableHighlight>
    ) )
  }

  render () {

    return(
      <View style={ styles.container }>
        <View style={ styles.appContainer }>
          <View style={ styles.logoContainer }>
            <Image
              source={ logo }
              style={ styles.logoStyle }
            />
          </View>
          <View style={ styles.textContainer }>
            <Text style={ styles.textStyle }>Food App</Text>
          </View>
        </View>
        { this.getMenuItems() }
        <TouchableHighlight
          underlayColor={ colors.darkRed }
          activeOpacity={ 0.5 }
          onPress={ this.logout } 
          style={ styles.listItemContainer }
        >
          <Text style={ styles.navText } >Log Out</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default CustomDrawer;
