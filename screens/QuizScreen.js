import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import QuizCard from '../components/quiz/QuizCard';

export default function QuizScreen() {

  let quiz = {
    question1: {
      order: 1,
      text: "I'm Question 1",
      type: "checkbox",
      responses: null
    },
    question2: {
      order: 2,
      text: "I'm Question 2",
      type: "radio",
      responses: null
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quiz Screen</Text>
      <QuizCard quiz={quiz}></QuizCard>
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