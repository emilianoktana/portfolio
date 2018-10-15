import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import InvestmentsScreen from '../screens/InvestmentsScreen'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default createBottomTabNavigator(
    {
      Home: HomeScreen,
      Portfolio: InvestmentsScreen
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'Portfolio') {
            iconName = `ios-cash${focused ? '' : '-outline'}`;
          }
  
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
)