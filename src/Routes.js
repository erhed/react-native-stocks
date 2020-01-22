import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../src/screens/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

export default AppNavigator;