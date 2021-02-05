import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../../Firebase';
import h from '../../globals';

import Response_Checkbox from './Response_Checkbox';
import Response_Radio from './Response_Radio';
import Response_Scale from './Response_Scale';
import Response_Text from './Response_Text';
import Response_TextArea from './Response_TextArea';
import { Portal, Modal } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import { AppContext } from '../../AppContext';
import SuggestionSwitcher from './SuggestionSwitcher';
import AppIcons from '../AppIcons';
import { AuthContext } from '../../AuthContext';
import Swiper from 'react-native-swiper/src'

export default function QuizCard(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [quizIndex, setQuizIndex] = React.useState(0);
  const [quizLength, setQuizLength] = React.useState(Array.isArray(props.quiz.questions) ? props.quiz.questions.length : 0);
  const [quizData, setQuizData] = React.useState([]);
  const [quizEffects, setquizEffects] = React.useState([]);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [outputSuggestions, setOutputSuggestions] = React.useState(null);
  const [surveyId, setSurveyId] = React.useState(null);

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

    switch (props.quizName) {
      // If the quiz is the initial Assessment submitted
      case 'initialAssessment': return submitInitialSurvey();
      // If it was the incident Questionnaire submitted
      case 'incidentQuestionnaire': return submitPauseSurvey();
      // Otherwise, something went wrong: do nothing
      default: return null;
    }
  }

  function submitInitialSurvey() {
    let data = {};
    // For each object in the effects array
    for (const key in quizEffects) {
      // For each property in the flag object, add it to the data object
      for (const traitFlag in quizEffects[key]) data[traitFlag] = quizEffects[key][traitFlag];
    }
    user.ref.child('profile/traits').set(data);
  }

  async function submitPauseSurvey() {
    // Get the user's traits
    let userTraits = Object.keys(await user.ref.child('profile/traits').once('value').then(s => s.val()) || {});
    let traitEffects = [];
    for (const key in userTraits) {
      let effects = (hitpause.traits[userTraits[key]] || {}).effects;
      if (effects) traitEffects.push(effects);
    }

    // Tally the output flags, filter for the three highest, and randomize them
    let outputFlags = h.tallyOutputFlags([...quizEffects, ...traitEffects]);
    let topThree = h.getHighsAndLows(outputFlags, 3, 0)[0];
    let suggestions = h.randomizeSuggestions(topThree);
    // Set the outputSuggestions object with the randomized suggestions
    setOutputSuggestions({
      suggestion_1: { ...hitpause.suggestions[suggestions[0]], $key: suggestions[0] },
      suggestion_2: { ...hitpause.suggestions[suggestions[1]], $key: suggestions[1] },
      suggestion_3: { ...hitpause.suggestions[suggestions[2]], $key: suggestions[2] }
    });
    // Save the results to firebase
    user.ref.child(`profile/pauseSurveys`).push({
      suggestions: suggestions,
      timestamp: Date.now(),
      outputFlags: outputFlags
    }).then((s) => setSurveyId(s.key));
    setModalVisible(true);
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

  function closeAndRedirect(selectedId) {
    // Reset all variables to prepare for next quiz
    user.ref.child(`profile/pauseSurveys/${surveyId}/selected`).set(selectedId)
    props.navigation.navigate('Home');
    setQuizIndex(0);
    setQuizData([]);
    setquizEffects([]);
    setNextDisabled(false);
    setPrevDisabled(true);
    setModalVisible(false);
    setOutputSuggestions(null);
    setSurveyId(null);
  }

  function getResponseComponent(question) {
    if (question.type == "checkbox") {
      return (
        <Response_Checkbox
          responses={question.responses}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Checkbox>
      );
    }
    else if (question.type == "radio") {
      return (
        <Response_Radio
          responses={question.responses}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Radio>
      );
    }
    else if (question.type == "scale") {
      return (
        <Response_Scale
          effects={question.effects}
          scaleLow={question.scaleLow}
          scaleHigh={question.scaleHigh}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Scale>
      );
    }
    else if (question.type == "text") {
      return <Response_Text></Response_Text>;
    }
    else if (question.type == "textarea") {
      return <Response_TextArea></Response_TextArea>;
    }
    return null;
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePrevQuestion()}
          disabled={prevDisabled}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        {
          quizIndex == quizLength - 1 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmission()}
              disabled={nextDisabled}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNextQuestion()}
              disabled={nextDisabled}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <Portal>
        {
          !!outputSuggestions &&
          <Modal
            visible={modalVisible}
            dismissible={false}
            contentContainerStyle={styles.resultsModal}
          >
            <Swiper style={styles.wrapper} showsButtons loop={false}>
              <View testID="Suggestion1" style={styles.slide1}>
                <Text style={styles.modalHeader}>Results</Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_1.text}</Text>
                <Text style={{ textAlign: 'center' }}>
                  <AppIcons name={outputSuggestions.suggestion_1.icon} />
                </Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_1.body}</Text>
                <SuggestionSwitcher suggestionId={outputSuggestions.suggestion_1}></SuggestionSwitcher>
                {/* <SpotifySuggestions></SpotifySuggestions> */}
                <View style={styles.modalRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => closeAndRedirect(outputSuggestions.suggestion_1.$key)}>
                    <Text style={styles.modalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View testID="Suggestion2" style={styles.slide2}>
                <Text style={styles.modalHeader}>Results</Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_2.text}</Text>
                <Text style={{ textAlign: 'center' }}>
                  <AppIcons name={outputSuggestions.suggestion_2.icon} />
                </Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_2.body}</Text>
                <SuggestionSwitcher suggestionId={outputSuggestions.suggestion_2}></SuggestionSwitcher>
                {/* <SpotifySuggestions></SpotifySuggestions> */}
                <View style={styles.modalRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => closeAndRedirect(outputSuggestions.suggestion_2.$key)}>
                    <Text style={styles.modalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View testID="Suggestion3" style={styles.slide3}>
                <Text style={styles.modalHeader}>Results</Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_3.text}</Text>
                <Text style={{ textAlign: 'center' }}>
                  <AppIcons name={outputSuggestions.suggestion_3.icon} />
                </Text>
                <Text style={styles.modalText}>{outputSuggestions.suggestion_3.body}</Text>
                <SuggestionSwitcher suggestionId={outputSuggestions.suggestion_3}></SuggestionSwitcher>
                {/* <SpotifySuggestions></SpotifySuggestions> */}
                <View style={styles.modalRow}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => closeAndRedirect(outputSuggestions.suggestion_3.$key)}>
                    <Text style={styles.modalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Swiper>
          </Modal>
        }
      </Portal>
      <Portal>
        {/* <Modal visible={modalVisible} dismissible={false} contentContainerStyle={styles.resultsModal}> */}
        <Modal visible={false} dismissible={false} contentContainerStyle={styles.resultsModal}>
          <Text style={styles.modalHeader}>Results</Text>
          <Text style={styles.modalText}>{!!outputSuggestions ? outputSuggestions.text : ""}</Text>
          <Text style={{ textAlign: 'center' }}>
            {!!outputSuggestions && <AppIcons name={outputSuggestions.icon} />}
          </Text>
          <Text style={styles.modalText}>{!!outputSuggestions ? outputSuggestions.body : ""}</Text>
          <SuggestionSwitcher suggestionId={outputSuggestions}></SuggestionSwitcher>
          {/* <SpotifySuggestions></SpotifySuggestions> */}
          <View style={styles.modalRow}>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setModalVisible(false);
              props.navigation.navigate('Home');
            }}>
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  resultsModal: {
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 30,
    flex: 1
  },
  modalHeader: {
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
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#00095e',
    borderRadius: 8,
    width: RFValue(80),
  },
  quizQuestion: {
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    height: RFValue(30),
    width: RFValue(120),
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
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
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132090',
    left: '10%'
  },
  slide2: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132090',
    left: '10%'
  },
  slide3: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132090',
    left: '10%'
  },
});

