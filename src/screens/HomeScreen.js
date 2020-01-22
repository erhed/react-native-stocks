import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, Keyboard, FlatList } from 'react-native';
import ListItem from '../components/ListItem/ListItem';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.listData = [
      {
        title: 'nummer ett',
        id: '1'
      },
      {
        title: 'nummer två',
        id: '2'
      },
      {
        title: 'nummer tre',
        id: '3'
      },
    ];

    this.state = {
      text: 'hej',
      listData: this.listData
    }
  }

  onInputTextChange = text => {
    if (text === '') {
      Keyboard.dismiss();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 205, height: 75 }}
            source={require('../assets/yahoo-finance-logo.jpg')}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchTextInput}
            placeholder='Search asset'
            placeholderTextColor='#AAAAAA'
            clearButtonMode='while-editing'
            onChangeText={text => this.onInputTextChange(text)} />
        </View>
        {/* <Text>{this.state.text}</Text> */}
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={this.state.listData}
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
    marginTop: 50,
    marginBottom: 40,
  },
  searchContainer: {
    margin: 20,
  },
  searchTextInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#0000FF',
    fontSize: 16,
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  }
});