import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, Keyboard, FlatList, Button } from 'react-native';
import ListItem from '../components/ListItem/ListItem';
import {  } from 'react-native-gesture-handler';

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
      searchText: '',
      headerText: 'Favourites',
      isEditModeEnabled: false,
      showEditButton: true,
      editButtonText: 'Edit...',
      listData: this.listData
    }
  }

  onInputTextChange = text => {
    this.setState({ searchText: text });

    if (text === '') {
      this.setState({ headerText: 'Favourites', listData: this.listData, showEditButton: true });
      Keyboard.dismiss();
    } else {
      this.setState({ searchText: text, headerText: 'Search', listData: this.listData2, showEditButton: false });
    }
  }

  onInputBlur = () => {
    this.setState({ searchText: '', headerText: 'Favourites', listData: this.listData, showEditButton: true });
  }

  editButtonPressed = () => {
    this.setState({ isEditModeEnabled: !this.state.isEditModeEnabled });
    if (!this.state.isEditModeEnabled) {
      this.setState({ editButtonText: 'Done' });
    } else {
      this.setState({ editButtonText: 'Edit...' });
    }
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
            value={this.state.searchText}
            style={styles.searchTextInput}
            placeholder='Search asset'
            placeholderTextColor='#AAAAAA'
            clearButtonMode='while-editing'
            onBlur={() => this.onInputBlur()}
            onChangeText={text => this.onInputTextChange(text)} />
        </View>
        <View style={styles.listContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.listHeader}>{this.state.headerText}</Text>
            <View style={styles.editButtonContainer}>
              {this.state.showEditButton &&
              <Button 
                title={this.state.editButtonText} 
                onPress={() => this.editButtonPressed()} 
              />}
            </View>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.listData}
            extraData={this.state.listData}
            renderItem={({ item }) => <ListItem text={item.title} removeEnabled={this.state.isEditModeEnabled} />}
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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  searchTextInput: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(126, 31, 255)',
    fontSize: 18,
    fontWeight: '300',
  },
  listContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 8,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  listHeader: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
    color: 'rgb(55, 1, 125)',
    flex: 1,
  },
  editButtonContainer: {
    paddingBottom: 5,
    right: -8,
  }
});