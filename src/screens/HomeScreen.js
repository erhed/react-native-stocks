import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, Keyboard, FlatList, Button, StatusBar, AsyncStorage } from 'react-native';
import ListItem from '../components/ListItem/ListItem';
import { searchForAsset } from '../api/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFavourites, removeFavourite } from '../actions/Favourites';
import { NavigationEvents } from 'react-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      headerText: 'Favourites',
      isEditModeEnabled: false,
      showEditButton: true,
      editButtonText: 'Edit...',
      listData: [],
      showActivityIndicator: false,
    }
  }

  async componentDidMount() {
    await this.loadFavourites();
  }

  saveFavourites = async () => {
    try {
      await AsyncStorage.setItem('favourites', JSON.stringify(this.props.favourites.favourites));
    } catch (error) {
      console.warn('error saving favourites');
    }
  }

  loadFavourites = async () => {
    try {
      let data = await AsyncStorage.getItem('favourites');
      let favourites = JSON.parse(data);
      this.props.loadFavourites(favourites);
    } catch (error) {
      console.warn('error getting favourites');
    }
  }

  updateFavourites = async () => {
    this.setState({
      listData: this.props.favourites.favourites,
    });
    await this.saveFavourites();
  }

  removeFavourite = async index => {
    this.props.removeFavourite(index);
    await this.saveFavourites().then(async () => {
      await this.updateFavourites();
    });
  }

  onInputTextChange = async text => {
    this.setState({ searchText: text });

    if (text === '') {
      this.setListMode('Favourites');
      Keyboard.dismiss();
    } else {
      this.setListMode('Search', text);
      this.setState({ listData: [{ name: 'Enter at least 3 characters', id: 0 }] });
      if (text.length > 2) {
        let results = await searchForAsset(text);
        if (results.status === 'error') {
          // TODO: ERROR HANDLING
        } else {
          this.setState({ listData: results });
        }
      }
    }
  }

  onInputBlur = () => {
    this.setListMode('Favourites');
  }

  setListMode = (mode, text) => {
    if (mode === 'Favourites') {
      this.setState({ searchText: '', headerText: 'Favourites', listData: this.props.favourites.favourites, showEditButton: true });
    } else if (mode === 'Search') {
      this.setState({ searchText: text, headerText: 'Search', listData: [], showEditButton: false });
      if (this.state.isEditModeEnabled) {
        this.toggleEditMode();
      }
    }
  }

  toggleEditMode = () => {
    this.setState({ isEditModeEnabled: !this.state.isEditModeEnabled });
    if (!this.state.isEditModeEnabled) {
      this.setState({ editButtonText: 'Done' });
    } else {
      this.setState({ editButtonText: 'Edit...' });
    }
  }

  onAssetPress = (index, action) => {
    if (action === 'delete') {
      this.removeFavourite(index);
    } else if (action === 'open') {
      this.props.navigation.navigate('ChartScreen', {
        symbol: this.state.listData[index].symbol,
        name: this.state.listData[index].name,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <NavigationEvents
          onDidFocus={() => this.updateFavourites()}
        />
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
                  onPress={() => this.toggleEditMode()}
                />}
            </View>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.listData}
            extraData={this.state.listData}
            renderItem={({ item, index }) => <ListItem
              text={item.name}
              removeEnabled={this.state.isEditModeEnabled}
              index={index}
              onPress={(index, action) => this.onAssetPress(index, action)}
            />}
            keyExtractor={item => item.id}
            keyboardShouldPersistTaps={'always'}
          />
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
    loadFavourites,
    removeFavourite
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
    marginTop: 18,
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