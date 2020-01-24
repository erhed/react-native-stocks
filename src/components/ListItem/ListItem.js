import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ListItem = ({ text, removeEnabled, index, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textTouchArea}
        onPress={() => onPress(index, 'open')}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      {removeEnabled &&
        <View style={styles.removeContainer}>
          <TouchableOpacity
            style={styles.removeTouchArea}
            onPress={() => onPress(index, 'delete')}>
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
  textTouchArea: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
    flex: 1
  },
  removeContainer: {
    width: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeTouchArea: {
    height: 21,
    width: 21,
    justifyContent: 'center',
    alignItems: 'center',
  }
});