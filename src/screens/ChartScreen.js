import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View, Dimensions } from 'react-native';
import { getPrices } from '../api/Price';
import { LineChart } from 'react-native-chart-kit';

export default class ChartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      name: '',
      dataAvailable: false,
      dates: [],
      prices: [],
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
    this.setState({
      dates: data.dates,
      prices: data.prices,
      dataAvailable: true,
    });
    //console.warn(data);
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.headerName}>{this.state.name}</Text>
          <Text style={styles.headerSymbol}>{this.state.symbol}</Text>
          {this.state.dataAvailable &&
            <LineChart
              data={{
                labels: this.state.dates,
                datasets: [
                  {
                    data: this.state.prices
                  }
                ]
              }}
              width={Dimensions.get("window").width - 31}
              height={220}
              yAxisLabel=''
              yAxisSuffix=''
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(126, 31, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(126, 31, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "3",
                  strokeWidth: "2",
                  stroke: 'rgb(126, 31, 255)',
                }
              }}
              verticalLabelRotation={90}
              withVerticalLabels={false}
              withInnerLines={false}
              withOuterLines={false}
              style={{
                borderRadius: 16,
                left: -14,
              }}
            />}
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
    marginBottom: 40,
  },

});