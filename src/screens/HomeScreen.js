import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <SafeAreaView>
        <Text>HomeScreen</Text>
      </SafeAreaView>
    );
  }
}