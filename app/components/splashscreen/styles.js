import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create( {
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : colors.red
  },
  logoStyle : {
    width : 120,
		height : 120
  }
} );

export default styles;