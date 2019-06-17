import React from 'react';
import { createDrawerNavigator, createAppContainer, } from 'react-navigation';

import MainStackNavigator from './MainStackNavigator';
import GroupStackNavigator from './GroupStackNavigator';
import SideMenu from '../components/menu/SideMenu';
import Logout from '../screens/Logout';

const Drawer = createAppContainer(createDrawerNavigator(
{
  MainStack: {
    screen: MainStackNavigator
  },
  GroupStack:{
    screen: GroupStackNavigator
  },
  LogoutScreen:{
    screen: Logout
  }
},
{
  initialRouteName: "MainStack",
  contentOptions: {
    activeTintColor: "#e91e63"
  },
  contentComponent: props => <SideMenu name={""} {...props} />
}));

export default Drawer;