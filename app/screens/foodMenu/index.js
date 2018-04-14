import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, Content, Text } from 'native-base';

import NavBar from '../../components/navBar';
import CustomList from '../../components/customList';

export default class FoodMenu extends Component {
	static navigationOptions = {
		header : null,
		gesturesEnabled:false
	}
	
	state = {
		loading : false,
		isRefreshing : false,
		data : []
	};
		
	fetchMenu = ( isRefreshing ) => {
		this.setState( { 
			loading : isRefreshing ? false : true,
			isRefreshing : isRefreshing || false
		 } );
		 
		 setTimeout( () => {
			 this.setState( { 
 				loading : false,
 				isRefreshing : false
 			 } );
		 }, 500);
	}
	
	getMenu = ( item ) => {
		return <Text>Item</Text>
	}
	
	render() {
		const { loading, isRefreshing, data } = this.state;
		
		return (
			<Container>
				<NavBar
					leftIcon="ios-arrow-back"
					leftIconPress={ () => { this.props.navigation.goBack() } }
					title="Menu"
				/>
				<Content
					refreshControl={
						<RefreshControl
							refreshing={ isRefreshing }
							onRefresh={ () => { this.fetchMenu( true ) } }
						/>
					}
				>
					<CustomList 
						loading={ loading }
						data={ data }
						renderRow={ this.getMenu }
					/>
				</Content>
			</Container>
		)
	}
}