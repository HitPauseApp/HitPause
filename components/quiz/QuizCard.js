import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import firebase from '../../Firebase';

import QuizQuestion from './QuizQuestion'

import Response_Checkbox from './Response_Checkbox';
import Response_Radio from './Response_Radio';
import Response_Scale from './Response_Scale';
import Response_Text from './Response_Text';
import Response_TextArea from './Response_TextArea';
import { RFValue } from "react-native-responsive-fontsize";

export default class QuizCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.state = {
      quizIndex: 0,
      quizScore: [],
      questionScore: ''
    }
    this.setState({ quizIndex: this.props.quizIndex });
  }

  // Callback function to capture radio button score
  radioButtonCallback = (score) => {
    let newScore = score;
    this.setState({ questionScore: newScore });
  }

  // Callback function to capture the score of the checkboxes
  checkboxCallback = (checked) => {
    let scores = [];
    checked.forEach(element => {
      if (element.checked) {
        scores = [...scores, element.score];
      }
      this.setState({ questionScore: scores });
    });
  }

  handleNextQuestion() {
    if (Array.isArray(this.props.quiz.questions) &&
      this.state.quizIndex < this.props.quiz.questions.length - 1) {
      console.log("Before:", this.state.quizIndex);
      this.setState({ quizIndex: this.state.quizIndex + 1 });

      //Add the questionScore to the entire quizScore array only when the button is pushed
      // * Push the question score into the quizScore array
      // * Reset questionScore so it doesn't add duplicated values if a question is
      //skipped (can probably be depreciated when all questions are required)
      let qScore = this.state.questionScore;
      this.setState({
        quizScore: [...this.state.quizScore, qScore],
        questionScore: ''
      });
    } else {
      console.log("Reached end of quiz...")
      console.log(this.state.quizIndex);
      // Temporary
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/profile/quizHistory/initialAssessment`)
        .push({
          taken: true
        });
    }
  }
  //Change rendering via props to render via state
  //https://stackoverflow.com/questions/30034265/trigger-child-re-rendering-in-react-js

  render() {
    let responseComponent;
    if (this.props.quiz.questions[this.state.quizIndex].type == "checkbox") {
      responseComponent =
        <Response_Checkbox
          response={this.props.quiz.questions[this.state.quizIndex].responses}
          onScoreUpdate={this.checkboxCallback}
        >
        </Response_Checkbox>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "radio") {
      responseComponent =
        <Response_Radio
          response={this.props.quiz.questions[this.state.quizIndex].responses}
          onScoreUpdate={this.radioButtonCallback}>
        </Response_Radio>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "scale") {
      responseComponent = <Response_Scale></Response_Scale>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "text") {
      responseComponent = <Response_Text></Response_Text>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "textarea") {
      responseComponent = <Response_TextArea></Response_TextArea>
    }
    return (
      <View style={styles.quizQuestion}>
        <QuizQuestion question={this.props.quiz.questions[this.state.quizIndex]}></QuizQuestion>
        <View>

        </View>
        {responseComponent}
        <Button style={styles.button} onPress={() => this.handleNextQuestion()} title="Next Question"></Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  quizQuestion: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 100,
    height: RFValue(300),
    width: RFValue(250),
  },
  button: {
    marginTop: 20
  }
});

