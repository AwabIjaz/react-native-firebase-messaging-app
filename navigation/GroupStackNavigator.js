import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Groups from '../screens/Groups';
import GroupMessages from '../screens/GroupMessages';

const GroupStack = createStackNavigator({
	GroupsScreen:Groups,
	GroupMessagesScreen:GroupMessages,
});

export default GroupStack;