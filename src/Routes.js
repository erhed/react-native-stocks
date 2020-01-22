import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import StartScreen from '../src/screens/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

export default AppNavigator;