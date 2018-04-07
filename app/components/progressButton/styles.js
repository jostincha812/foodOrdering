import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const buttonProps = {
	width : '100%',
	height : 40,
	borderRadius : 5,
	justifyContent : 'center',
	alignItems : 'center',
	marginVertical : 10,
	backgroundColor : colors.red
}

const styles = StyleSheet.create({
  container : {
    width : '100%',
    height : 60,
    alignItems : 'center'
  },
	normalButton : {
		...buttonProps,
	},
	roundButton : {
		...buttonProps,
		borderRadius : 20,
	},
});

export default styles;