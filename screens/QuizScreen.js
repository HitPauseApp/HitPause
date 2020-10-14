import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase.js'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import QuizCard from '../components/quiz/QuizCard';
import Loading from './Loading';
import { Asset } from 'expo-asset';

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
      saveIncidentQuiz(quizData);
    })
  }, []);

  let saveIncidentQuiz = async (quizData) => {
    let quizString = JSON.stringify(quizData);
    console.log(quizString);
    try{
      await AsyncStorage.setItem('IncidentQuiz', quizString);
    }catch (error){
      console.log(error);
    }
  }

  let useSavedQuiz = async () =>{
    try{
      const value = AsyncStorage.getItem('IncidentQuiz');
      if(value != null){
        // return JSON.parse(value);
        console.log(value);
      }
    }catch(error){
      console.log(error);
    }
  }

  if (!isLoadingComplete) {
    return <Loading message="Loading your quiz..."></Loading>;
  } else {
    return (
      <View style = {styles.container}> 
         <View style={styles.contentContainer}>
               <Text style={styles.header}>{quiz.quizName}</Text>
               <QuizCard quiz={quiz} quizName={props.route.params.quizName}></QuizCard>
              <Button onPress={() => useSavedQuiz()} title="Print Ansyc Quiz"></Button> 
        {/* </View>

        <View> */}
              
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
  header:{
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    textAlign: 'center'
  },
});