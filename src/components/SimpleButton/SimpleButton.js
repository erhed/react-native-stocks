import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SimpleButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchArea} onPress={() => onPress()}>
        <Text style={styles.text}>Add to favourites</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SimpleButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgb(126, 31, 255)',
    borderRadius: 12
  },
  touchArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  }
});