import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { mainStyles,colors } from '../../theme';

const PageLoader = ( props ) => (
  <View style={ mainStyles.pageCenterStyles }>
    <ActivityIndicator size="large" color={ colors.red } />
  </View>
);

export default PageLoader;