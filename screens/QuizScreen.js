import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase.js'
import { StyleSheet, Text, View, Button } from 'react-native';

import QuizCard from '../components/quiz/QuizCard';
import Loading from './Loading';

export default function QuizScreen(){
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [quiz, setQuiz] = React.useState({});
  const [quizIndex, setQuizIndex] = React.useState({})

  let quizName = "initialAssessment";

  React.useEffect(() => {
    firebase.database().ref(`hitpause/quizzes/${quizName}`).once('value').then(s => {
      let quizData = s.val();
      let questionList = quizData.questions;
      if (!quizData.dynamic) {
        setQuizIndex(1);
        let sortedQuestionList = Object.values(questionList).sort((a, b) => a.order - b.order);
        quizData.questions = sortedQuestionList.slice();
      }
      setQuiz(quizData);
      setLoadingComplete(true);
    })
  }, []);

  // React.useEffect(() => {
  // }, [quiz])

  // function handleNextQuestion(){
  //     setQuizIndex(quizIndex + 1);
  // }


  if (!isLoadingComplete) {
    return <Loading></Loading>;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Quiz Screen</Text>
        <QuizCard quiz={quiz} quizIndex={quizIndex}></QuizCard>
        {/* <Button onPress={() => handleNextQuestion()}>Next Question</Button> */}
      </View>
    );
  }
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