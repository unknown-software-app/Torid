import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon.js';
import KaafaScreen from '../screens/KaafaScreen.js';
import ScoreScreen from '../screens/ScoreScreen.js';

const KaafaStack = createStackNavigator({
  Home: KaafaScreen,
});

KaafaStack.navigationOptions = {
  tabBarLabel: 'Kaafa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};



const ScoreStack = createStackNavigator({
  Homo: ScoreScreen,
});

ScoreStack.navigationOptions = {
  tabBarLabel: 'Score',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-woman'}
    />
  ),
};


export default createBottomTabNavigator({
  KaafaStack,
  ScoreStack,
});
