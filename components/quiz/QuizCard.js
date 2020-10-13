import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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
    this.handlePrevQuestion = this.handlePrevQuestion.bind(this);
    this.state = {
      quizIndex: 0,
      quizLength: Array.isArray(this.props.quiz.questions) ? this.props.quiz.questions.length : 0,
      quizData: [],
      quizScore: [],
      questionScore: '',
      nextDisabled: false,
      prevDisabled: true     // Start on first question by default
    }
  }

  // Updates data for quiz when a response is selected or changes
  updateQuizData = (data) => {
    this.setState((state) => {
      let update = [...state.quizData]
      update[state.quizIndex] = data;
      console.log("update:", update)
      return { quizData: update };
    });
  }

  handleNextQuestion = () => {
    if (this.state.quizIndex < this.state.quizLength - 1) {
      let newIndex = this.state.quizIndex + 1;
      this.setState({
        quizIndex: newIndex,
        // Always re-enable previous button when moving forward
        prevDisabled: false
      });
    } else if (this.state.quizIndex == this.state.quizLength - 1) {
      // Sanitize input data
      for (const key in this.state.quizData) {
        if (typeof this.state.quizData[key] === 'undefined') this.state.quizData[key] = '';
      }
      
      firebase.database()
        .ref(`users/${firebase.auth().currentUser.uid}/profile/quizHistory/${this.props.quizName}`)
        .push({
          timestamp: Date.now(),
          responses: this.state.quizData
        });
      // TODO: Display summary screen instead of redirecting
    }
  }

  handlePrevQuestion() {
    let newIndex = this.state.quizIndex - 1;
    this.setState({ quizIndex: newIndex });
    if (newIndex == 0) this.setState({ prevDisabled: true })
  }

  handleButtonDisable() {
    if (buttonDisabled == true) {
      this.setState({ buttonDisabled: false })
    } else if (buttonDisabled == false) {
      this.setState({ buttonDisabled: false })
    }
  }

  render() {
    let responseComponent;
    let buttonDisabled = true;
    if (this.props.quiz.questions[this.state.quizIndex].type == "checkbox") {
      responseComponent =
        <Response_Checkbox
          responses={this.props.quiz.questions[this.state.quizIndex].responses}
          onChange={this.updateQuizData}
          value={this.state.quizData[this.state.quizIndex]}
        >
        </Response_Checkbox>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "radio") {
      responseComponent =
        <Response_Radio
          responses={this.props.quiz.questions[this.state.quizIndex].responses}
          onChange={this.updateQuizData}
          value={this.state.quizData[this.state.quizIndex]}
        >
        </Response_Radio>
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "scale") {
      responseComponent =
        <Response_Scale
          scaleLow={this.props.quiz.questions[this.state.quizIndex].scaleLow}
          scaleHigh={this.props.quiz.questions[this.state.quizIndex].scaleHigh}
          onChange={this.updateQuizData}
          value={this.state.quizData[this.state.quizIndex]}
        ></Response_Scale>
      buttonDisabled = false;
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "text") {
      responseComponent = <Response_Text></Response_Text>
      buttonDisabled = false;
    }
    else if (this.props.quiz.questions[this.state.quizIndex].type == "textarea") {
      responseComponent = <Response_TextArea></Response_TextArea>
      buttonDisabled = false;
    }
    return (
      <View style={styles.quizQuestion}>
        <QuizQuestion question={this.props.quiz.questions[this.state.quizIndex]}></QuizQuestion>
        {responseComponent}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePrevQuestion}
            disabled={this.state.prevDisabled}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleNextQuestion}
            disabled={this.state.nextDisabled}
          >
            <Text style={styles.buttonText}>{this.state.quizIndex == this.state.quizLength - 1 ? 'Submit' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
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
    height: 'auto',
    width: RFValue(250),
  },
  button: {
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    overflow: 'hidden',
    height: RFValue(30),
    width: RFValue(100),
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
  }
});

