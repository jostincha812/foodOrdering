import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

import { colors } from '../../theme';
import styles from './style';

const NavButton = ( { icon, onPress } ) => (
  <TouchableOpacity
      onPress={ onPress }
      style={ styles.navButton }
  >
    <Icon name={ icon } style={ styles.navIcon }/>
  </TouchableOpacity>
)

const NavBar = ( props ) => {
  return (
    <View style={ styles.navBar }>
      <StatusBar
         backgroundColor={ colors.red }
         barStyle="light-content"
       />
      <NavButton
        icon={ props.leftIcon }
        onPress={ props.leftIconPress }
      />
      <View style={ styles.titleContainer}>
        <Text style={ styles.title }>{ props.title }</Text>
      </View>
      {
        props.rightIcon ?
        <NavButton
          icon={ props.rightIcon }
          onPress={ props.rightIconPress }
        /> :
        <View
          style={ styles.navButton }
        />
      }
    </View>
  )
}

export default NavBar;