import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../../Firebase';
import h from '../../globals';

import Response_Checkbox from './Response_Checkbox';
import Response_Radio from './Response_Radio';
import Response_Scale from './Response_Scale';
import Response_Text from './Response_Text';
import Response_TextArea from './Response_TextArea';
import { RFValue } from "react-native-responsive-fontsize";
import { AppContext } from '../../AppContext';
import { AuthContext } from '../../AuthContext';

export default function Form(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [quizIndex, setQuizIndex] = React.useState(0);
  const [quizLength, setQuizLength] = React.useState(0);
  const [quizData, setQuizData] = React.useState([]);
  const [quizEffects, setquizEffects] = React.useState([]);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [prevDisabled, setPrevDisabled] = React.useState(true);

  React.useEffect(() => {
    if (Array.isArray(props.quiz.questions)) setQuizLength(props.quiz.questions.length);
  }, [props.quiz.questions])

  function updateQuizData(data, flags) {
    // Updates data for quiz when a response is selected or changes
    let dataUpdate = [...quizData];
    let effectsUpdate = [...quizEffects];
    dataUpdate[quizIndex] = data;
    effectsUpdate[quizIndex] = flags;
    setQuizData(dataUpdate);
    setquizEffects(effectsUpdate);
    console.log(data, flags);
  }

  async function handleSubmission() {
    // Sanitize input data
    for (const key in quizData) if (typeof quizData[key] === 'undefined') quizData[key] = '';
    props.onSubmit(quizEffects);
  }

  function handleNextQuestion() {
    let newIndex = quizIndex + 1;
    setQuizIndex(newIndex);
    // Always re-enable previous button when moving forward
    setPrevDisabled(false);
  }

  function handlePrevQuestion() {
    let newIndex = quizIndex - 1;
    setQuizIndex(newIndex);
    if (newIndex == 0) setPrevDisabled(true);
  }

  function getResponseComponent(question) {
    switch (question.type) {
      case 'checkbox':
        return (
          <Response_Checkbox
            responses={question.responses}
            onChange={updateQuizData}
            value={quizData[quizIndex]}
          ></Response_Checkbox>
        );
      case 'radio':
        return (
          <Response_Radio
            responses={question.responses}
            onChange={updateQuizData}
            value={quizData[quizIndex]}
          ></Response_Radio>
        );
      case 'scale':
        return (
          <Response_Scale
            effects={question.effects}
            scaleLow={question.scaleLow}
            scaleHigh={question.scaleHigh}
            onChange={updateQuizData}
            value={quizData[quizIndex]}
          ></Response_Scale>
        );
      case 'text':
        return <Response_Text></Response_Text>;
      case 'textarea':
        return <Response_TextArea></Response_TextArea>;
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.quizQuestion}>
        <Text style={styles.questionNumber}>{quizIndex + 1}</Text>
        <Text style={styles.questionText}>{props.quiz.questions[quizIndex].text}</Text>
      </View>

      <ScrollView style={{ flexGrow: 1 }}>
        { getResponseComponent(props.quiz.questions[quizIndex]) }
      </ScrollView>

      <View style={styles.controlButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handlePrevQuestion()} disabled={prevDisabled}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        {
          quizIndex == quizLength - 1 ? (
            <TouchableOpacity style={styles.button} onPress={() => handleSubmission()} disabled={nextDisabled}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => handleNextQuestion()} disabled={nextDisabled}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  quizQuestion: {
    flexDirection: 'column',
    backgroundColor: '#F2FCFD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(15),
    padding: 10,
    marginBottom: 20,
    width: '80%',
    height: '20%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
  },
  button: {
    borderWidth: 2,
    borderColor: '#00095e',
    borderRadius: RFValue(15),
    overflow: 'hidden',
    height: RFValue(30),
    width: RFValue(120),
    justifyContent:'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40
  },
  buttonText: {
    fontSize: 20,
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  controlButtons: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    margin: 20
  },
  questionText: {
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  questionNumber: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#00095e',
    borderRadius: 100,
    paddingHorizontal: 4,
    fontWeight: 'bold'
  }
});

