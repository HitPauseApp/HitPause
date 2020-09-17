import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import TipOTD from '../components/TipOTD';

export default function HomeScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Quiz Screen</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111625'
  },
  text: {
    color: '#fff'
  }
});