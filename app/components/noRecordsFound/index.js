import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';

import { mainStyles,colors } from '../../theme';
import styles  from './styles';

const NoRecordsFound = ( { title = 'No Records Found' } ) => (
  <View style={ mainStyles.pageCenterStyles }>
    <Icon name="frown-o" type="FontAwesome" style={ styles.iconStyle }/>
    <Text style={ styles.textStyle }>{ title }</Text>
  </View>
);

export default NoRecordsFound;