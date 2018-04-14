import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const color = colors.noRecords

const styles = StyleSheet.create({
  iconStyle : {
    fontSize : 80,
    color
  },
  textStyle : {
    fontSize : 18,
    paddingTop : 10,
    color
  }
});

export default styles;