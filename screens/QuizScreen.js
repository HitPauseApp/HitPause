import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase.js'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import QuizCard from '../components/quiz/QuizCard';
import Loading from './Loading';
import { Portal, Modal } from 'react-native-paper';

export default function QuizScreen(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [quiz, setQuiz] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  // let quizName = "incidentQuestionnaire";

  React.useEffect(() => {
    console.log(props)
    firebase.database().ref(`hitpause/quizzes/${props.route.params.quizName}`).once('value').then(s => {
      let quizData = s.val();
      let questionList = quizData.questions;
      if (!quizData.dynamic) {
        let sortedQuestionList = Object.values(questionList).sort((a, b) => a.order - b.order);
        quizData.questions = sortedQuestionList.slice();
      }
      setQuiz(quizData);
      setLoadingComplete(true);
      saveIncidentQuiz(quizData);
      showModal();
    })
  }, []);

  let saveIncidentQuiz = async (quizData) => {
    try {
      await AsyncStorage.setItem('IncidentQuiz', JSON.stringify(quizData));
    } catch (error) {
      console.log(error);
    }
  }

  let getSavedQuiz = async () => {
    AsyncStorage.getItem('IncidentQuiz', (err, result) => {
      return JSON.parse(result);
    });
  }


  if (!isLoadingComplete) {
    return <Loading message="Loading your quiz..."></Loading>;
  } else {
    return (
      <View style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
            <Text>Welcome To the HitPause Quiz</Text>
          </Modal>
        </Portal>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>{quiz.quizName}</Text>
          <QuizCard quiz={quiz} quizName={props.route.params.quizName} navigation={props.navigation}></QuizCard>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00095e'
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: '9%'
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  modalContent:{
    backgroundColor: 'white',
    height: 70,
    margin: 10,
    borderRadius: 10,
    textAlign: "center"
  }
});