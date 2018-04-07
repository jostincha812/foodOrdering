import colors from './colors';

const buttonProps = {
	width : '100%',
	height : 40,
	borderRadius : 5,
	justifyContent : 'center',
	alignItems : 'center',
	marginVertical : 10
}

const mainStyles = {
	publicBackground : {
		flex : 1,
		alignItems : 'center',
		justifyContent : 'center',
		backgroundColor : colors.themeWhite,
		height : '100%',
		padding : '15%'
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
	roundButton : {
		...buttonProps,
		borderRadius : 20,
		backgroundColor : colors.red
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
	}	
};

export default mainStyles;
