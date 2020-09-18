import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';


import WelcomeBanner from '../components/WelcomeBanner';
export default function QuizScreen(){
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Quiz Screen</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040926'
  },
  text: {
    color: '#fff'
  }
});