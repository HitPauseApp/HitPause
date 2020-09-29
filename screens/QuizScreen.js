import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import QuizQuestion from '../components/quiz/QuizQuestion';

export default function QuizScreen(){

  let quiz = {
    order: 10,
    text: "Hey, I'm the Quiz Question Text",
    type: "checkbox",
    responses: null
  }

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Quiz Screen</Text>
      <QuizQuestion quiz={quiz}></QuizQuestion>
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