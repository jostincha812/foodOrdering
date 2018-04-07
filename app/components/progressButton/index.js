import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

import { mainStyles, colors } from '../../theme';
import styles from './styles';


const ProgressButton = ( { loading, onPress, buttonText, round } ) => (
  <View style={ styles.container }>
    { !loading ? 
        <TouchableOpacity 
          onPress={ onPress } 
          style={ round ? styles.roundButton : styles.normalButton  }
          activeOpacity={0.8}
        >
            <Text style={mainStyles.whiteText}> { buttonText } </Text>
        </TouchableOpacity>
      :
      <ActivityIndicator size="large" color={ colors.red } />
   }
 </View>
);

export default ProgressButton;