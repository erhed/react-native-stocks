import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View, Dimensions, ActivityIndicator } from 'react-native';
import { getPrices } from '../api/Price';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { getInformation } from '../api/Information';

export default class ChartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      name: '',
      dataAvailable: false,
      dates: [],
      prices: [],
      infoAvailable: false,
      info: '',
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

    let info = await getInformation(symbol);
    this.setState({
      infoAvailable: true,
      info: info,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView 
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.headerName}>{this.state.name}</Text>
            <Text style={styles.headerSymbol}>{this.state.symbol}</Text>
            {!this.state.dataAvailable && <View style={styles.activityIndicatorDataContainer}><ActivityIndicator /></View>}
            {this.state.dataAvailable && <Text style={styles.price}>{this.state.prices[this.state.prices.length - 1]}</Text>}
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
                width={Dimensions.get("window").width - 36}
                height={220}
                yAxisLabel=''
                yAxisSuffix=''
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 2,
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
                  left: -12,
                }}
              />}
            <Text style={styles.infoHeader}>Company information</Text>
            {!this.state.infoAvailable && <View style={styles.activityIndicatorInfoContainer}><ActivityIndicator /></View>}
            {this.state.infoAvailable && <Text style={styles.infoText}>{this.state.info}</Text>}
          </ScrollView>
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
    marginTop: 20,
    flex: 1,
  },
  headerName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 0,
    color: 'rgb(55, 1, 125)',
  },
  headerSymbol: {
    fontSize: 22,
    fontWeight: '300',
    color: 'rgb(55, 1, 125)',
    marginBottom: 10,
  },
  activityIndicatorDataContainer: {
    marginBottom: 30,
  },
  price: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: '400',
    color: 'rgb(126, 31, 255)',
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgb(55, 1, 125)',
  },
  activityIndicatorInfoContainer: {
    marginTop: 30,
  },
  infoText: {
    marginTop: 10,
    color: '#333333',
  }
});