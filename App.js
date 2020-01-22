import React from 'react';

// React Navigation
import { createAppContainer } from "react-navigation";
import AppNavigator from './src/Routes';
const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return (
    <AppContainer />
  );
};

export default App;
