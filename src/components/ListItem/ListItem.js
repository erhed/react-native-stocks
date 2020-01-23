import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({text, removeEnabled}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {removeEnabled && <View style={styles.removeContainer}></View>}
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
    backgroundColor: '#FF0000',
  }
});