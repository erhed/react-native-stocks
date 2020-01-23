import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../src/screens/HomeScreen';
import ChartScreen from '../src/screens/ChartScreen';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    ChartScreen: {
      screen: ChartScreen,
      navigationOptions: {
        headerShown: true,
        headerStyle: {
          backgroundColor: 'rgb(55, 1, 125)',
        },
        headerTintColor: '#fff',
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

export default AppNavigator;