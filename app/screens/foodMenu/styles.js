import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  restaurantContainer : {
    width : '100%',
    backgroundColor : colors.themeWhite,
    elevation : 5,
    position : 'relative'
  },
  restaurantImageStyle : {
    width : '100%',
    height : 180
  },
  restaurantName : {
    fontWeight : 'bold',
    color : colors.white,
    fontSize : 24,
    position : 'absolute',
    bottom : 8,
    left : 18,
    elevation : 1
  },
  textContainer : {
    width : '100%',
    height : 40,
    backgroundColor : colors.black,
    position : 'absolute',
    bottom : 0,
    opacity : 0.5
  },
  phoneContainer : {
    position : 'absolute',
    bottom : 8,
    right : 18,
    elevation : 1
  },
  phoneIcon : {
    color : colors.white,
  },
  foodContainer : {
    margin : 5,
    borderRadius : 5,
    elevation : 2,
    flexDirection : 'row',
    padding : 10,
    backgroundColor : colors.themeWhite
  },
  foodImage : {
    width : 50,
    height : 50
  },
  foodDetailsContainer : {
    flex : 1,
    paddingLeft : 10,
  },
  foodName : {
    color : colors.black,
    fontSize : 14,
    fontWeight : 'bold'
  },
  rateText : {
    color : colors.noRecordsFound,
    fontSize : 10
  },
  addToCartContainer : {
    width : 80,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default styles;