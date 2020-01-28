import React from 'react';

// React Navigation
import { createAppContainer } from "react-navigation";
import AppNavigator from './src/Routes';
const AppContainer = createAppContainer(AppNavigator);

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import favouriteReducer from './src/reducers/Favourites';
const store = createStore(favouriteReducer);

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
