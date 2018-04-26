import { StyleSheet } from 'react-native';

import { colors, mainStyles } from '../../theme';

const seperatorProps = {
  borderBottomWidth : 1,
  borderBottomColor : colors.grey
}

const styles = StyleSheet.create({
  restaurantContainer : {
    width : '100%',
    paddingVertical : 20,
    paddingHorizontal : 10,
    alignItems : 'center',
    justifyContent : 'center',
    ...seperatorProps
  },
  restaurantImage : {
    width : 60,
    height : 60,
    borderRadius : 30,
  },
  restaurantHeader : {
    fontSize : 24,
    color : colors.black,
    marginTop : 10
  },
  foodContainer : {
    padding : 10,
    flexDirection : 'row',
    ...seperatorProps
  },
  foodDetailsContainer : {
    flex : 1,
    justifyContent : 'center',
  },
  rateContainer : {
    justifyContent : 'center',
    alignItems : 'center'
  },
  rateText : {
    color : colors.black
  },
  qtyText : {
    color : colors.red,
  },
  foodName : {
    color : colors.black
  },
  foodImage : {
    width : 30,
    height : 30,
    borderRadius : 15,
    marginRight : 5 
  },
  yourOrderContainer : {
    padding : 10,
    justifyContent : 'center',
    ...seperatorProps
  },
  yourOrderText : {
    color : colors.black,
    fontWeight : 'bold'
  },
  costSplitContainer : {
    padding : 10,
    ...seperatorProps
  },
  costSplitDetails : {
    flexDirection : 'row',
    paddingVertical : 2
  },
  leftText : {
    color : colors.noRecordsFound,
    flex : 1
  },
  rightText : {
    color : colors.black,
  },
  totalContainer : {
    width : '100%',
    paddingTop : 20,
    paddingHorizontal : 10,
    alignItems : 'flex-end',
    ...mainStyles.handleBottomButton
  },
  totalText : {
    fontSize : 18,
    fontWeight : 'bold',
    color : colors.black,
  },
  successIcon : {
    color : colors.success,
    fontSize : 120
  },
  successText : {
    color : colors.black,
    fontSize : 18,
    textAlign : 'center',
    marginBottom : 10
  },
  publicBackground : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  addressContainer : {
    paddingHorizontal : 10,
    paddingBottom : 20
  },
  loader : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default styles;