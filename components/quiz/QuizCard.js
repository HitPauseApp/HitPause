import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../Firebase';

import Response_Checkbox from './Response_Checkbox';
import Response_Radio from './Response_Radio';
import Response_Scale from './Response_Scale';
import Response_Text from './Response_Text';
import Response_TextArea from './Response_TextArea';
import { Portal, Modal } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native';
import { AppContext } from '../../AppContext';
import SuggestionSwitcher from './SuggestionSwitcher';
import AppIcons from '../AppIcons';

export default function QuizCard(props) {
  const hitpause = React.useContext(AppContext);
  const [quizIndex, setQuizIndex] = React.useState(0);
  const [quizLength, setQuizLength] = React.useState(Array.isArray(props.quiz.questions) ? props.quiz.questions.length : 0);
  const [quizData, setQuizData] = React.useState([]);
  const [quizFlags, setQuizFlags] = React.useState([]);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [outputSuggestions, setOutputSuggestions] = React.useState(null);

  // Updates data for quiz when a response is selected or changes
  function updateQuizData(data, flags) {
    let dataUpdate = [...quizData];
    let flagUpdate = [...quizFlags];
    dataUpdate[quizIndex] = data;
    flagUpdate[quizIndex] = flags;
    setQuizData(dataUpdate);
    setQuizFlags(flagUpdate);
    console.log(data, flags);
  }

  function handleSubmission() {
    // Sanitize input data
    for (const key in quizData) {
      if (typeof quizData[key] === 'undefined') quizData[key] = '';
    }

    let outputFlags = tallyOutputFlags();
    let topThree = getHighsAndLows(outputFlags, 3, 0)[0];
    console.log('outputFlags:', outputFlags);
    console.log('topThree:', topThree);

    let suggestion = getRandomizedSuggestion(topThree);
    console.log(suggestion);
    setOutputSuggestions(hitpause.suggestions[suggestion]);
    setModalVisible(true);

    firebase.database()
      .ref(`users/${firebase.auth().currentUser.uid}/profile/quizHistory/${props.quizName}`)
      .push({
        suggestion: suggestion,
        timestamp: Date.now(),
        responses: quizData,
        outputFlags: outputFlags
      });
  }

  function tallyOutputFlags() {
    let flags = {};
    let modifiers = [];
    // Get flag changes
    for (const key in quizFlags) {
      for (const flagKey in quizFlags[key]) {
        // Flag has a special behavior
        if (flagKey.includes('_highest_')) {
          let count = parseInt(flagKey.replace('_highest_', ''));
          modifiers.push({ type: 'high', count: count, amount: parseFloat(quizFlags[key][flagKey]) });
        } else if (flagKey.includes('_lowest_')) {
          let count = parseInt(flagKey.replace('_lowest_', ''));
          modifiers.push({ type: 'low', count: count, amount: parseFloat(quizFlags[key][flagKey]) });

          // Flags of this type already exist, will sum
        } else if (Object.keys(flags).includes(flagKey)) {
          flags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(quizFlags[key][flagKey]);
          // Otherwise, add normally
        } else {
          flags[flagKey] = parseFloat(quizFlags[key][flagKey]);
        }
      }
    }

    // For all of our special cases
    for (const key in modifiers) {
      let modifiedFlags = {};
      // Depending on type of case, grab relevant flags
      if (modifiers[key].type == 'high') {
        modifiedFlags = getHighsAndLows(flags, modifiers[key].count, 0)[0];
      } else if (modifiers[key].type == 'low') {
        modifiedFlags = getHighsAndLows(flags, 0, modifiers[key].count)[1];
      }
      // Apply changes to those flags
      for (const flagKey in modifiedFlags) {
        modifiedFlags[flagKey] = modifiedFlags[flagKey] + modifiers[key].amount;
      }
      flags = { ...flags, ...modifiedFlags };
    }
    return flags;
  }

  // TODO: Incomplete... will probably want to move this into summary screen
  // TODO: Ties are unfair, as lower keys will always be chosen... need a way to randomly select when there are ties
  function getHighsAndLows(flags, numHighs, numLows) {
    let highValues = [], lowValues = [];
    let sortedFlags = Object.entries(flags).sort((a, b) => (a[1] < b[1]));
    if (numHighs > 0) {
      highValues = sortedFlags.slice(0, numHighs);
    }
    if (numLows > 0) {
      lowValues = sortedFlags.slice(sortedFlags - 1 - numLows, sortedFlags.length - 1);
    }
    return [Object.fromEntries(highValues), Object.fromEntries(lowValues)];
  }

  function getRandomizedSuggestion(flags) {
    let n = 0;
    for (const key in flags) {
      let squaredDoubleFlag = (flags[key] * 2) ** 2;
      flags[key] = squaredDoubleFlag + n;
      n = squaredDoubleFlag + n;
    }
    let randomInt = Math.floor(Math.random() * n);
    for (const key in flags) {
      if (flags[key] > randomInt) return key;
    }
    return null;
  }

  function handleNextQuestion() {
    setQuizIndex(quizIndex + 1);
    // Always re-enable previous button when moving forward
    setPrevDisabled(false);
  }

  function handlePrevQuestion() {
    let newIndex = quizIndex - 1;
    setQuizIndex(newIndex);
    if (newIndex == 0) setPrevDisabled(true);
  }

  function getResponseComponent() {
    let responseComponent;
    if (props.quiz.questions[quizIndex].type == "checkbox") {
      responseComponent =
        <Response_Checkbox
          responses={props.quiz.questions[quizIndex].responses}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Checkbox>
    }
    else if (props.quiz.questions[quizIndex].type == "radio") {
      responseComponent =
        <Response_Radio
          responses={props.quiz.questions[quizIndex].responses}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Radio>
    }
    else if (props.quiz.questions[quizIndex].type == "scale") {
      responseComponent =
        <Response_Scale
          flagChanges={props.quiz.questions[quizIndex].flagChanges}
          scaleLow={props.quiz.questions[quizIndex].scaleLow}
          scaleHigh={props.quiz.questions[quizIndex].scaleHigh}
          onChange={updateQuizData}
          value={quizData[quizIndex]}
        ></Response_Scale>
    }
    else if (props.quiz.questions[quizIndex].type == "text") {
      responseComponent = <Response_Text></Response_Text>
    }
    else if (props.quiz.questions[quizIndex].type == "textarea") {
      responseComponent = <Response_TextArea></Response_TextArea>
    }
    return responseComponent;
  }

  return (
    <View style={styles.container}>

      <View style={styles.quizQuestion}>
        <Text style={styles.questionNumber}>{props.quiz.questions[quizIndex].order}</Text>
        <Text style={styles.questionText}>{props.quiz.questions[quizIndex].text}</Text>
      </View>

      <ScrollView style={{flexGrow: 1}}>
        {getResponseComponent(quizIndex)}
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
        <Modal visible={modalVisible} dismissible={false} contentContainerStyle={styles.resultsModal}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  scrollView: {

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
  questionText:{
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

