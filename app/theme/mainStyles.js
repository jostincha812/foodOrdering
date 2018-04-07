import { Dimensions } from 'react-native';
import colors from './colors';

const { height: screenHeight } = Dimensions.get('window');

const mainStyles = {
	publicBackground : {
		alignItems : 'center',
		justifyContent : 'center',
		backgroundColor : colors.themeWhite,
		height : screenHeight,
		paddingHorizontal : '15%'
	},
	logoStyle : {
		width : 100,
		height : 100
	},
	appName : {
		fontSize : 18,
		marginBottom : 20
	},
	widthAll : {
		width : '100%'
	},
	whiteText : {
		color : colors.white
	},
	underlinedText : {
		textDecorationLine : 'underline',
	},
	errorText : {
		fontSize : 10,
		color : colors.danger,
		marginLeft : 5
	},
	hidden : {
		display : 'none'
	}
};

export default mainStyles;
