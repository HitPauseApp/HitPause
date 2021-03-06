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
  const [surveyIndex, setSurveyIndex] = React.useState(0);
  const [surveyLength, setSurveyLength] = React.useState(0);
  const [surveyData, setSurveyData] = React.useState([]);
  const [surveyEffects, setsurveyEffects] = React.useState([]);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [prevDisabled, setPrevDisabled] = React.useState(true);

  React.useEffect(() => {
    if (Array.isArray(props.survey.questions)) setSurveyLength(props.survey.questions.length);
  }, [props.survey.questions]);

  React.useEffect(() => checkForNextEnable(), [surveyIndex]);

  function checkForNextEnable(data) {
    data = data || surveyData;
    if (props.survey.questions[surveyIndex].required && typeof data[surveyIndex] == 'undefined') setNextDisabled(true);
    else setNextDisabled(false);
  }

  function updateSurveyData(data, flags) {
    // Updates data for survey when a response is selected or changes
    let dataUpdate = [...surveyData];
    let effectsUpdate = [...surveyEffects];
    dataUpdate[surveyIndex] = data;
    effectsUpdate[surveyIndex] = flags;
    setSurveyData(dataUpdate);
    setsurveyEffects(effectsUpdate);
    checkForNextEnable(dataUpdate);
    // console.log(data, flags);
  }

  async function handleSubmission() {
    // Sanitize input data
    for (const key in surveyData) if (typeof surveyData[key] === 'undefined') surveyData[key] = '';
    props.onSubmit(surveyEffects);
  }

  function handleNextQuestion() {
    let newIndex = surveyIndex + 1;
    setSurveyIndex(newIndex);
    // Always re-enable previous button when moving forward
    setPrevDisabled(false);
  }

  function handlePrevQuestion() {
    let newIndex = surveyIndex - 1;
    setSurveyIndex(newIndex);
    if (newIndex == 0) setPrevDisabled(true);
  }

  function getResponseComponent(question) {
    switch (question.type) {
      case 'checkbox':
        return (
          <Response_Checkbox
            responses={question.responses}
            onChange={updateSurveyData}
            value={surveyData[surveyIndex]}
          ></Response_Checkbox>
        );
      case 'radio':
        return (
          <Response_Radio
            responses={question.responses}
            onChange={updateSurveyData}
            value={surveyData[surveyIndex]}
          ></Response_Radio>
        );
      case 'scale':
        return (
          <Response_Scale
            effects={question.effects}
            scaleLow={question.scaleLow}
            scaleHigh={question.scaleHigh}
            onChange={updateSurveyData}
            value={surveyData[surveyIndex]}
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

      <View style={styles.surveyQuestion}>
        <View style={styles.numberContainer}>
            <Text style={styles.questionNumber}>{surveyIndex + 1}</Text>
        </View>
        <Text style={styles.questionText}>{props.survey.questions[surveyIndex].text}</Text>
        {
          props.survey.questions[surveyIndex].type == 'checkbox' &&
          <Text style={styles.helperMessage}>(select all that apply)</Text>
        }
      </View>

      <ScrollView style={{ flexGrow: 1 }}>
        { getResponseComponent(props.survey.questions[surveyIndex]) }
      </ScrollView>

      <View style={styles.controlButtons}>
        <TouchableOpacity style={[styles.button, prevDisabled ? { backgroundColor: '#bbb' } : {} ]} onPress={() => handlePrevQuestion()} disabled={prevDisabled}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        {
          surveyIndex == surveyLength - 1 ? (
            <TouchableOpacity style={[styles.button, nextDisabled ? { backgroundColor: '#bbb' } : {} ]} onPress={() => handleSubmission()} disabled={nextDisabled}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, nextDisabled ? { backgroundColor: '#bbb' } : {} ]} onPress={() => handleNextQuestion()} disabled={nextDisabled}>
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
  surveyQuestion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    height: '30%'
  },
  button: {
    backgroundColor: h.colors.primary,
    borderRadius: 999,
    overflow: 'hidden',
    height: RFValue(36),
    width: '40%',
    justifyContent: 'center',
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
  },
  buttonText: {
    fontSize: RFValue(18),
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  controlButtons: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    padding: 30,
    justifyContent: 'space-between'
  },
  questionText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(16),
    textAlign: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    textAlignVertical: 'center'
  },
  questionNumber: {
    
    textAlign: 'center',
    color: '#fff',
    // backgroundColor: h.colors.primary,
    fontSize: RFValue(16),
    fontFamily: 'Poppins-Bold',
    textAlignVertical: 'center',
    paddingTop: RFValue(3),

  },
  numberContainer: {
    backgroundColor: h.colors.primary,
    borderRadius: 999,
    //overflow:'hidden',
    marginVertical: 10,
    width: RFValue(30),
    height: RFValue(30),
   
    
  },
  helperMessage: {
    fontFamily: 'Poppins-Light',
    color: h.colors.primary,
    fontSize: RFValue(14)
  }
});

