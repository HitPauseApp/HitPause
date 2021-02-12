import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../../Firebase.js'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import QuizCard from '../../components/quiz/QuizCard';
import Loading from '../Loading';
import { AuthContext } from '../../AuthContext.js';

export default function QuizScreen(props) {
  const user = React.useContext(AuthContext);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [quiz, setQuiz] = React.useState({});

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
        <View style={styles.contentContainer}>
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
    paddingVertical: '9%',

  },
  headingCont:{
    flexDirection: "row",
    alignItems: "center"
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  modalContent:{
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 30,
  },
  modalHeadingText:{
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 25,
    color: 'white'
  },
  modalText: {
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  info: {
    
  }
});