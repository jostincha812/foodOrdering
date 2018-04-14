import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const NAVBAR_HEIGHT = 45;

const styles = StyleSheet.create({
  navBar : {
    width : '100%',
    height : NAVBAR_HEIGHT,
    elevation : 5,
    backgroundColor : colors.red,
    justifyContent : 'center',
    flexDirection : 'row'
  },
  titleContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  title :{
    fontSize : 16,
    fontWeight : 'bold',
    color : colors.white
  },
  navButton : {
    width : 50,
    height: NAVBAR_HEIGHT,
    justifyContent : 'center',
    alignItems : 'center',
  },
  navIcon : {
    color : colors.white
  }
});

export default styles;