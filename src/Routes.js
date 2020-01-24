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
        title: '',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'rgb(255, 255, 255)',
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

export default AppNavigator;