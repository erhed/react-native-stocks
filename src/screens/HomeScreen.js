import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, Keyboard, FlatList } from 'react-native';
import ListItem from '../components/ListItem/ListItem';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.listData = [
      {
        title: 'Apple',
        id: '1'
      },
      {
        title: 'Google',
        id: '2'
      },
      {
        title: 'Microsoft',
        id: '3'
      },
    ];

    this.listData2 = [
      {
        title: 'Netflix',
        id: '1'
      },
      {
        title: 'Exxon',
        id: '2'
      },
      {
        title: 'Tesla',
        id: '3'
      },
    ];

    this.state = {
      text: 'hej',
      headerText: 'Favourites',
      listData: this.listData
    }
  }

  onInputTextChange = text => {
    if (text === '') {
      this.setState({ headerText: 'Favourites', listData: this.listData });
      Keyboard.dismiss();
    } else {
      this.setState({ headerText: 'Search', listData: this.listData2 });
    }
  }

  onInputBlur = () => {

  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 100, height: 37 }}
            source={require('../assets/yahoo-finance-logo.jpg')}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchTextInput}
            placeholder='Search asset'
            placeholderTextColor='#AAAAAA'
            clearButtonMode='while-editing'
            onBlur={() => this.onInputBlur()}
            onChangeText={text => this.onInputTextChange(text)} />
        </View>
        {/* <Text>{this.state.text}</Text> */}
        <View style={styles.listContainer}>
        <Text style={styles.listHeader}>{this.state.headerText}</Text>
          <FlatList
            style={styles.list}
            data={this.state.listData}
            extraData={this.state.listData}
            renderItem={({ item }) => <ListItem text={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  searchContainer: {
    margin: 20,
  },
  searchTextInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(126, 31, 255)',
    fontSize: 18,
    fontWeight: '300',
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flex: 1,
  },
  listHeader: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
    color: 'rgb(55, 1, 125)',
  }
});