import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Form from '../../components/quiz/Form';
import SuggestionSwitcher from '../../components/quiz/SuggestionSwitcher';
import Loading from '../Loading';
import { AuthContext } from '../../AuthContext.js';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppContext } from '../../AppContext.js';
import AppIcons from '../../components/AppIcons.js';
import { ScrollView } from 'react-native-gesture-handler';

export default function PauseSurvey(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState({});
  const [pushId, setPushId] = React.useState(null);
  const [quiz, setQuiz] = React.useState({});

  React.useEffect(() => {
    // Get survey config from firebase
    firebase.database().ref(`hitpause/quizzes/incidentQuestionnaire`).once('value').then(s => {
      let quizData = s.val();
      let questionList = quizData.questions;
      if (!quizData.dynamic) {
        let sortedQuestionList = Object.values(questionList).sort((a, b) => a.order - b.order);
        quizData.questions = sortedQuestionList.slice();
      }
      setQuiz(quizData);
      setIsLoading(false);
    })
  }, []);

  async function handleSubmit(effects) {
    // Get the user's traits
    let userTraits = Object.keys(await user.ref.child('profile/traits').once('value').then(s => s.val()) || {});
    let traitEffects = [];
    for (const key in userTraits) {
      let effects = (hitpause.traits[userTraits[key]] || {}).effects;
      if (effects) traitEffects.push(effects);
    }

    // Tally the output flags, filter for the three highest, and randomize them
    let outputFlags = h.tallyOutputFlags([...effects, ...traitEffects]);
    let topThree = h.getHighsAndLows(outputFlags, 3, 0)[0];
    let suggestions = h.randomizeSuggestions(topThree);
    // // Set the outputSuggestions object with the randomized suggestions
    setResults({
      s1: { ...hitpause.suggestions[suggestions[0]], $key: suggestions[0] },
      s2: { ...hitpause.suggestions[suggestions[1]], $key: suggestions[1] },
      s3: { ...hitpause.suggestions[suggestions[2]], $key: suggestions[2] }
    });
    // Check if the user has a pause survey folder, and award a badge if not
    if (user.ref.child('profile/pauseSurveys').once('value').then(s => !s.exists())) {
      user.ref.child('profile/badges').update({ firstPauseSurvey: true });
    }
    let id = user.ref.push().key;
    // Save the results to firebase
    user.ref.child(`profile/pauseSurveys/${id}`).set({
      suggestions: suggestions,
      timestamp: Date.now(),
      outputFlags: outputFlags
    });
    setPushId(id);
  }

  function handleSuggestionSelect(key) {
    if (key && key !== '$none') user.ref.child(`profile/pauseSurveys/${pushId}`).update({ selected: key });
    props.navigation.navigate('Home');
  }

  if (isLoading) return <Loading message="Loading your quiz..."></Loading>;
  else {
    return (
      <View style={styles.container}>
        {
          !Object.keys(results).length ? (
            <View style={{ width: '100%', height: '100%' }}>
              <Form quiz={quiz} onSubmit={handleSubmit}></Form>
            </View>
          ) : (
            <ScrollView style={{ display: 'flex' }}>
              <Text style={{ textAlign: 'center', color: h.colors.primary, fontSize: RFValue(18), fontFamily: 'Poppins-Medium', paddingVertical: 20 }}>Here are our suggestions for you:</Text>
              <View style={{ flex: 1, display: 'flex', padding: 20, position: 'relative', marginTop: 20 }}>
                <View style={{ position: 'absolute', top: -30, left: 20, right: 0 }}>
                  <Text style={styles.bigNumber}>#1</Text>
                  <Text style={styles.bigNumberNote}>Top Suggestion!</Text>
                </View>
                <View style={styles.titleHolder}>
                  <AppIcons name={results.s1.icon} size={RFValue(96)} color={h.colors.primary} />
                  <Text style={{ color: h.colors.primary, fontSize: RFValue(20), fontFamily: 'Poppins-Bold', maxWidth: '50%', paddingLeft: 20, textAlignVertical: 'center' }}>{results.s1.text}</Text>
                </View>
                <Text style={{ color: h.colors.primary, fontSize: RFValue(13), fontFamily: 'Poppins-Medium', paddingBottom: 20, textAlign: 'center' }}>{results.s1.body}</Text>
                <SuggestionSwitcher suggestionId={results.s1.$key}></SuggestionSwitcher>
                <TouchableOpacity style={styles.button } onPress={() => handleSuggestionSelect(results.s1.$key)}>
                  <Text style={styles.buttonText}>I will try this: {results.s1.text}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, display: 'flex', paddingHorizontal: 30, paddingTop: 10 }}>
                <View style={styles.card}>
                  <Text style={styles.smallNumber}>#2</Text>
                  <View style={styles.titleHolder}>
                    <AppIcons name={results.s2.icon} size={RFValue(36)} color={h.colors.primary}></AppIcons>
                    <Text style={styles.cardTitle}>{results.s2.text}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: RFValue(12), paddingVertical: 10, fontFamily: 'Poppins-Medium', color: h.colors.primary }}>{results.s2.body}</Text>
                    <SuggestionSwitcher suggestionId={results.s2.$key}></SuggestionSwitcher>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => handleSuggestionSelect(results.s2.$key)}>
                    <Text style={styles.buttonText}>I will try this: {results.s2.text}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>
                  <Text style={styles.smallNumber}>#3</Text>
                  <View style={styles.titleHolder}>
                    <AppIcons name={results.s3.icon} size={RFValue(36)} color={h.colors.primary}></AppIcons>
                    <Text style={styles.cardTitle}>{results.s3.text}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: RFValue(12), paddingVertical: 10, fontFamily: 'Poppins-Medium', color: h.colors.primary }}>{results.s3.body}</Text>
                    <SuggestionSwitcher suggestionId={results.s3.$key}></SuggestionSwitcher>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => handleSuggestionSelect(results.s3.$key)}>
                    <Text style={styles.buttonText}>I will try this: {results.s3.text}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.button, { marginTop: 0, marginBottom: 20 }]} onPress={() => handleSuggestionSelect('$none')}>
                  <AppIcons name="materialicons:thumb-down" color="#fff" />
                  <Text style={[styles.buttonText, { paddingLeft: 10 }]}>I don't like any of these</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: RFValue(20)
  },
  card: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    alignContent: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    backgroundColor: '#F2FCFD',
    borderRadius: RFValue(20),
    padding: 20,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: RFValue(18),
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
    color: h.colors.primary,
    maxWidth: '50%'
  },
  titleHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  bigNumber: {
    color: '#fff',
    backgroundColor: h.colors.primary,
    height: RFValue(56),
    width: RFValue(56),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: RFValue(24),
    fontFamily: 'Poppins-Bold',
    borderRadius: 999
  },
  bigNumberNote: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: h.colors.tertiary,
    color: '#fff',
    paddingLeft: 30,
    fontFamily: 'Poppins-Medium',
    borderRadius: 999,
    height: RFValue(28),
    fontSize: RFValue(13),
    paddingRight: 16,
    textAlignVertical: 'center',
    top: RFValue(14),
    left: RFValue(36)
  },
  smallNumber: {
    position: 'absolute',
    top: -10,
    left: -10,
    height: RFValue(48),
    width: RFValue(48),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(18),
    backgroundColor: h.colors.primary,
    color: '#fff',
    borderRadius: 999
  },
  button: {
    backgroundColor: h.colors.primary,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: RFValue(14)
  }
});
