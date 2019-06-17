import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import Drawer from './DrawerNavigator';


const StartStack = createStackNavigator({
	LandingScreen: Landing,
	LoginScreen: Login,
	SignUpScreen: SignUp
});


export default createAppContainer(createSwitchNavigator({
  Start: StartStack,
  Main: Drawer
}));