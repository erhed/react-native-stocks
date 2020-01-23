import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default class ChartScreen extends Component {
  constructor(props) {
    super(props);


    this.state = {
    }
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <Text>ChartScreen</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});