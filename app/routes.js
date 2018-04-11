import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import Login from './screens/login';
import SignUp from './screens/signUp';
import RestaurantList from './screens/restaurantList';
import FoodMenu from './screens/foodMenu';
import AboutUs from './screens/aboutUs';
import Cart from './screens/cart';

const RestaurantRoute = StackNavigator ( 
	{
		RestaurantList : { screen : RestaurantList },
		FoodMenu : { screen : FoodMenu },
		Cart : { screen : Cart },
	}
)

const PrivateRoutes = TabNavigator (
	{
		Restaurants : { screen : RestaurantRoute },
		AboutUs : { screen : AboutUs }
	},
	{
		tabBarPosition: 'bottom',
		order : [ 'Restaurants', 'AboutUs' ],
		animationEnabled : false
	}
)

const PublicRoutes = StackNavigator(
	{
	  Login: { screen: Login },
		SignUp: { screen: SignUp },
	}
);

export { PublicRoutes, PrivateRoutes };
