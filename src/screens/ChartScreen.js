import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View } from 'react-native';
import { getPrices } from '../api/Price';

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

    let data = await getPrices(symbol);
    console.warn(data);
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.headerName}>{this.state.name}</Text>
          <Text style={styles.headerSymbol}>{this.state.symbol}</Text>
          
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFF',
    flex: 1
  },
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  headerName: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 0,
    color: 'rgb(55, 1, 125)',
  },
  headerSymbol: {
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: 'rgb(55, 1, 125)',
  },

});