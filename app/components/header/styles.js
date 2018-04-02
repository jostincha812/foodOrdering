import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  headerContainer : {
    //flex : 1,
    backgroundColor : colors.mainGreen
  },
  headerLeft : {
    flex : 1
  },
  headerBody : {
    flex : 3,
    alignItems : 'center'
  },
  headerRight : {
    flex : 1
  },
})

export default styles;
