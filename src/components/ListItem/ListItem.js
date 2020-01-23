import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({text}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
  }
});