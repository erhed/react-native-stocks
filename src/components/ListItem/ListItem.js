import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ListItem = ({ text, removeEnabled, index, onPressDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {removeEnabled &&
        <View style={styles.removeContainer}>
          <TouchableOpacity 
            style={styles.touchArea}
            onPress={() => onPressDelete(index)}>
            <Image
              style={{ width: 12, height: 12 }}
              source={require('../../assets/delete.png')} />
          </TouchableOpacity>
        </View>}
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
    flex: 1
  },
  removeContainer: {
    width: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchArea: {
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  }
});