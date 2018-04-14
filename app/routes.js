import React from "react";
import { StackNavigator, DrawerNavigator, SwitchNavigator } from "react-navigation";
// screens
import Login from './screens/login';
import SignUp from './screens/signUp';
import RestaurantList from './screens/restaurantList';
import FoodMenu from './screens/foodMenu';
import AboutUs from './screens/aboutUs';
import Cart from './screens/cart';
// components
import CustomDrawer from './components/customDrawer';

const RestaurantRoute = StackNavigator ( 
	{
		RestaurantList : { screen : RestaurantList },
		FoodMenu : { screen : FoodMenu },
		Cart : { screen : Cart },
	}
)

const PrivateRoutes = DrawerNavigator (
	{
		Restaurants : { screen : RestaurantRoute },
		AboutUs : { screen : AboutUs }
	},
	{
	  contentComponent : CustomDrawer,
		navigationOptions : {
			drawerLockMode: 'locked-closed'
		}
	} 
)

const PublicRoutes = StackNavigator(
	{
	  Login: { screen: Login },
		SignUp: { screen: SignUp },
	}
);

export { PublicRoutes, PrivateRoutes };
