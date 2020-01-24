import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default class ChartScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      symbol: '',
      name: '',
    }
  }

  async componentDidMount() {
    let symbol = this.props.navigation.getParam('symbol');
    let name = this.props.navigation.getParam('name');
    this.setState({
      symbol: symbol,
      name: name,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <Text>{this.state.symbol}</Text>
        <Text>{this.state.name}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFF',
    flex: 1
  }
});