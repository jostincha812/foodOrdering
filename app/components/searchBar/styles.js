import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
  searchContainer : {
    backgroundColor : colors.white,
    borderRadius : 5,
    position : 'relative',
    elevation : 5,
    margin : 5,
    flexDirection : 'row',
    alignItems : 'center'
  },
  iconStyle : {
    paddingLeft : 15,
    fontSize : 18,
    color : colors.grey
  },
  inputStyle : {
    flex : 1,
    marginLeft : 10,
  },
  cancelStyle : {
    paddingRight : 15,
    fontSize : 18,
    color : colors.grey,
  }
});

export default styles;