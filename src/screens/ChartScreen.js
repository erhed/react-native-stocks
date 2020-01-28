import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, View, Dimensions, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getPrices } from '../api/Price';
import { getInformation } from '../api/Information';
import SimpleButton from '../components/SimpleButton/SimpleButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFavourite } from '../actions/Favourites';

class ChartScreen extends Component {
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
    if (data.status === 'error') {
      // TODO: ERROR HANDLING
    } else {
      this.setState({
        dates: data.dates,
        prices: data.prices,
        dataAvailable: true,
      });
    }

    let info = await getInformation(symbol);
    if (info.status === 'error') {
      this.setState({
        infoAvailable: true,
        info: 'Not available',
      });
    } else {
      this.setState({
        infoAvailable: true,
        info: info,
      });
    }
  }

  addToFavourites = () => {
    this.props.addFavourite({
      id: this.state.name + '-' + this.state.symbol,
      name: this.state.name,
      symbol: this.state.symbol,
    });

    Alert.alert(
      this.state.name,
      'Added to favourites',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
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
                    r: "2",
                    strokeWidth: "1",
                    stroke: 'rgb(126, 31, 255)',
                  }
                }}
                verticalLabelRotation={90}
                withVerticalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
                style={{
                  borderRadius: 16,
                  left: -4,
                }}
              />}
            <SimpleButton onPress={() => this.addToFavourites()} />
            <Text style={styles.infoHeader}>Company information</Text>
            {!this.state.infoAvailable && <View style={styles.activityIndicatorInfoContainer}><ActivityIndicator /></View>}
            {this.state.infoAvailable && <Text style={styles.infoText}>{this.state.info}</Text>}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { favourites } = state
  return { favourites }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFavourite,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);

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
    height: 290,
    paddingTop: 100,
    backgroundColor: '#FFFFFF'
  },
  price: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 12,
    fontWeight: '400',
    color: 'rgb(126, 31, 255)',
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgb(55, 1, 125)',
    marginTop: 30,
  },
  activityIndicatorInfoContainer: {
    marginTop: 140,
  },
  infoText: {
    marginTop: 10,
    color: '#333333',
  }
});