import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import QuizQuestion from '../components/quiz/QuizQuestion';

export default function QuizScreen(){
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Quiz Screen</Text>
      <QuizQuestion></QuizQuestion>
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