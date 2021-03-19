import React from 'react'
import h from '../globals';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default function Loading(props) {
  let message = props.message || 'Loading';
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <ActivityIndicator size="large" color="#fff"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    marginBottom: 20,
    color: h.colors.primary
  }
})