import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import QuizQuestion from './QuizQuestion'

import Response_Checkbox from './Response_Checkbox';
import Response_Radio from './Response_Radio';
import Response_Scale from './Response_Scale';
import Response_Text from './Response_Text';
import Response_TextArea from './Response_TextArea';

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
  checkboxCallback = (checked) =>{
    let scores = [];
    checked.forEach(element => {
      if(element.checked){
        scores = [...scores, element.score];
      }
      this.setState({questionScore: scores});
    });
  }

  handleNextQuestion() {
    //increase quiz index
    let i = this.state.quizIndex;
    i = i + 1;
    this.setState({ quizIndex: i });

    //Add the questionScore to the entire quizScore array only when the button is pushed
    // * Push the question score into the quizScore array
    // * Reset questionScore so it doesn't add duplicated values if a question is
    //skipped (can probably be depreciated when all questions are required)
    let qScore = this.state.questionScore;
    this.setState({
      quizScore: [...this.state.quizScore, qScore],
      questionScore: ''
    });
  }

  render() {
    let responseComponent;
    if (this.props.quiz.questions[this.state.quizIndex].type == "checkbox") {
      responseComponent =
        <Response_Checkbox
          response={this.props.quiz.questions[this.state.quizIndex].responses}
          onScoreUpdate = {this.checkboxCallback}
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
    else if (this.props.quiz.questions[this.props.quizIndex].type == "scale") {
      responseComponent = <Response_Scale></Response_Scale>
    }
    else if (this.props.quiz.questions[this.props.quizIndex].type == "text") {
      responseComponent = <Response_Text></Response_Text>
    }
    else if (this.props.quiz.questions[this.props.quizIndex].type == "textarea") {
      responseComponent = <Response_TextArea></Response_TextArea>
    }
    return (
      <View>

        <QuizQuestion question={this.props.quiz.questions[this.state.quizIndex]}></QuizQuestion>
        <View>

        </View>
        {responseComponent}
        <Button onPress={() => this.handleNextQuestion()} title="Next Question"></Button>
        <Text style={{ color: '#fff' }}>{this.state.quizScore}</Text>
      </View>
    );
  }

}

