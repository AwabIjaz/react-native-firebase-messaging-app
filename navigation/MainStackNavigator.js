import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Messages from '../screens/Messages';
import CreateGroup from '../screens/CreateGroup';
import Broadcast from '../screens/Broadcast';

const MainStack = createStackNavigator({
	HomeScreen: Home,
	MessagesScreen: Messages,
	GroupScreen: CreateGroup,
	BroadcastScreen: Broadcast
});

export default MainStack;