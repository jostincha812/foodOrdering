import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
  bottomButton : {
		position : 'absolute',
		bottom : 0,
		width : '100%',
		height : 40,
		backgroundColor : colors.red,
		justifyContent : 'center',
		alignItems : 'center'
	},
  textStyle : {
    color : colors.white,
    fontSize : 14
  }
});

export default styles;