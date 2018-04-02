import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import Login from './screens/login';
import RestaurantList from './screens/restaurantList';
import FoodMenu from './screens/foodMenu';
import AboutUs from './screens/aboutUs';
import Cart from './screens/cart';


export const Router = StackNavigator(
	{
	  Login: { screen: Login },
	  Home : { screen: HomeRouter },
	}
);

const HomeRouter = TabNavigator (
	{
		Restaurants : RestaurantRoute,
		Cart,
		AboutUs
	},
	{
		order : [ 'AboutUs','Restaurants','Cart' ],
		animationEnabled : true
	}
)

const RestaurantRoute = StackNavigator ( 
	{
		RestaurantList,
		FoodMenu
	}
)