import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, Button } from 'react-native';
import Form from '../../components/quiz/Form';
import SuggestionSwitcher from '../../components/quiz/SuggestionSwitcher';
import Loading from '../Loading';
import { AuthContext } from '../../AuthContext.js';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppContext } from '../../AppContext.js';
import AppIcons from '../../components/AppIcons.js';
import { ScrollView } from 'react-native-gesture-handler';

export default function QuizScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState({});
  const [quiz, setQuiz] = React.useState({});

  React.useEffect(() => {
    // Get quiz config from firebase
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
    // Save the results to firebase
    user.ref.child(`profile/pauseSurveys`).push({
      suggestions: suggestions,
      timestamp: Date.now(),
      outputFlags: outputFlags
    });
    console.log('suggestions:', suggestions);
  }

  if (isLoading) return <Loading message="Loading your quiz..."></Loading>;
  else {
    return (
      <View style={styles.container}>
        {
          !Object.keys(results).length ? (
            <View>
              <QuizCard quiz={quiz} onSubmit={handleSubmit}></QuizCard>
            </View>
          ) : (
            <ScrollView style={{ display: 'flex' }}>
              <View style={{ flex: 1, display: 'flex' }}>
                <Text style={{ color: '#fff', fontSize: RFValue(24) }}>Our top suggestion for you is:</Text>
                <AppIcons name={results.s1.icon} size={RFValue(48)}/>
                <Text style={{ color: '#fff', fontSize: RFValue(18) }}>{results.s1.text}</Text>
                <Text style={{ color: '#fff', fontSize: RFValue(12) }}>{results.s1.body}</Text>
                <SuggestionSwitcher suggestionId={results.s1.$key}></SuggestionSwitcher>
              </View>
              <View style={{ flex: 1, display: 'flex'}}>
                <Text>Here are some other things to try:</Text>
                <View style={styles.card}>
                  <AppIcons name={results.s2.icon} color="#222"></AppIcons>
                  <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                    <Text style={styles.cardTitle}>{results.s2.text}</Text>
                    <Text style={{ fontSize: RFValue(12) }}>{results.s2.body}</Text>
                  </View>
                </View>
                <View style={styles.card}>
                  <AppIcons name={results.s3.icon} color="#222"></AppIcons>
                  <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                    <Text style={styles.cardTitle}>{results.s3.text}</Text>
                    <Text style={{ fontSize: RFValue(12) }}>{results.s3.body}</Text>
                  </View>
                </View>
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
    backgroundColor: '#00095e',
    paddingTop: RFValue(20)
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: RFValue(20),
    overflow: 'hidden',
    padding: RFValue(10),
    margin: RFValue(10)
  },
  cardTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold'
  }
});
