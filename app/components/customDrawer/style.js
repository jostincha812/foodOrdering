import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const navTextProps = {
  fontSize : 14,
  fontWeight : 'bold',
};

const navItemProps = {
  padding : 15,
  width : '100%',
  justifyContent : 'center'
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: colors.red,
    height: '100%'
  },
  appContainer : {
    height : 100,
    width:'100%',
    flexDirection: 'row',
  },
  logoContainer : {
    justifyContent : 'center',
    paddingHorizontal : 10
  },
  textContainer : { 
    flex : 1,
    justifyContent : 'center',
  },
  textStyle : {
    fontSize : 18,
    color : colors.white
  },
  logoStyle : {
    height : 80,
    width : 80
  },
  listItemContainer : {
    ...navItemProps
  },
  listActiveItemContainer : {
    ...navItemProps,
    backgroundColor : colors.darkRed
  },
  navText : {
    fontSize : 16,
    fontWeight : 'bold',
    color : colors.white
  },
});

export default styles;