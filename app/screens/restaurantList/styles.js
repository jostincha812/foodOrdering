import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const BORDER_RADIUS = 5;

const borderProps = {
  borderBottomLeftRadius : BORDER_RADIUS,
  borderBottomRightRadius : BORDER_RADIUS
}

const styles = StyleSheet.create({
  restaurantImageStyle : {
    height : 150,
    width:'100%',
    ...borderProps
  },
  itemContainerStyle : {
    flex : 1,
    flexDirection : 'column',
    position : 'relative',
    alignItems : 'center',
    backgroundColor : colors.white,
    margin : 5,
    elevation : 5,
    borderRadius : BORDER_RADIUS
  },
  restaurantNameContainer : {
    padding : 5,
    width : '100%',
  },
  restaurantName : {
    color : colors.black,
    fontSize : 14,
    fontWeight : 'bold',
  },
  addressContainer : {
    padding : 10,
    width : '100%',
    position : 'absolute',
    backgroundColor : colors.black,
    bottom : 0,
    justifyContent : 'center',
    opacity : 0.7,
    ...borderProps
  },
  addressText : {
    color : colors.white,
    fontSize : 10
  }
});

export default styles; 