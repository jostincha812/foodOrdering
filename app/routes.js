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
		FoodMenu : { screen : FoodMenu }
	}
)

const HomeRouter = TabNavigator (
	{
		Restaurants : { screen : RestaurantRoute },
		Cart : { screen : Cart },
		AboutUs : { screen : AboutUs }
	},
	{
		order : [ 'Restaurants','AboutUs','Cart' ],
		animationEnabled : false
	}
)

const Router = StackNavigator(
	{
	  Login: { screen: Login },
		SignUp: { screen: SignUp },
	  Home : { screen: HomeRouter },
	}
);

export default Router;