import React from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './main_page'
import Connection from './connect_page'

const Navigator = createStackNavigator({
  Home: { screen: Home },
  Connection: { screen: Connection },
}, {
  initialRouteName: 'Home',
});

const App = createAppContainer(Navigator)

export default App;


