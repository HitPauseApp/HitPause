import React from 'react'
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
    backgroundColor: '#00095e'
  },
  text: {
    marginBottom: 20,
    color: '#fff'
  }
})