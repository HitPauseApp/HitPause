import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase.js'
import { StyleSheet, Text, View, Button } from 'react-native';

import QuizCard from '../components/quiz/QuizCard';
import Loading from './Loading';

export default function QuizScreen(){
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [quiz, setQuiz] = React.useState({});

  let quizName = "incidentQuestionnaire";

  React.useEffect(() => {
    firebase.database().ref(`hitpause/quizzes/${quizName}`).once('value').then(s => {
      let quizData = s.val();
      let questionList = quizData.questions;
      if (!quizData.dynamic) {
        let sortedQuestionList = Object.values(questionList).sort((a, b) => a.order - b.order);
        quizData.questions = sortedQuestionList.slice();
      }
      setQuiz(quizData);
      setLoadingComplete(true);
    })
  }, []);

  if (!isLoadingComplete) {
    return <Loading message="Loading your quiz..."></Loading>;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Incidental Quiz</Text>
        <QuizCard quiz={quiz}></QuizCard>
        {/* <Button onPress={() => handleNextQuestion()}>Next Question</Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00095e'
  },
  header:{
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    textAlign: 'center'
  },
});