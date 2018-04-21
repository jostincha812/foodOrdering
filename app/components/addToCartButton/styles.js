import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container : {
    width : 60,
    height : 30,
    borderRadius : 5,
    borderWidth : 1,
    borderColor : colors.red,
    flexDirection : 'row'
  },
  textContainer : {
    flex : 1,
    paddingHorizontal : 2,
    justifyContent :'center',
    alignItems : 'center',
  },
  addText : {
    color : 'red',
  },
  buttonStyle : {
    flex : 1,
    backgroundColor : colors.red,
    justifyContent :'center',
    alignItems : 'center'
  },
  iconStyle : {
    color : colors.white,
    fontSize : 14
  }
});

export default styles;