import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <SafeAreaView style={styles.screen}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchTextInput}
          placeholder="Search asset" />
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  searchContainer: {
    margin: 20,
  },
  searchTextInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#FF0000',
    fontSize: 16,
  }
});