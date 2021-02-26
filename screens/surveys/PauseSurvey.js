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

export default function PauseSurvey(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState({});
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
            <View style={{ width: '100%', height: '100%' }}>
              <Form quiz={quiz} onSubmit={handleSubmit}></Form>
            </View>
          ) : (
            <ScrollView style={{ display: 'flex' }}>
              <View style={{ flex: 1, display: 'flex', padding: RFValue(20) }}>
                <Text style={{ color: '#00095e', fontSize: RFValue(18),fontFamily: 'Poppins-Medium', }}>Our top suggestion for you is:</Text>
                <View style={styles.titleHolder}>
                  <View style={styles.iconHolder}>
                    <AppIcons name={results.s1.icon} size={RFValue(96)} color={'#00095e'} />
                  </View>
                  <Text style={{ color: '#00095e', fontSize: RFValue(20), fontFamily: 'Poppins-Bold', alignSelf:'center', flex:1, paddingLeft:30}}>{results.s1.text}</Text>
                </View>
                {/* <Text style={{ color: '#00095e', fontSize: RFValue(18), fontFamily: 'Poppins-Bold', alignSelf:'center', paddingBottom:10, flex:1}}>{results.s1.text}</Text> */}
                <Text style={{ color: '#00095e', fontSize: RFValue(12), fontFamily: 'Poppins-Medium', paddingBottom:20, textAlign:'center' }}>{results.s1.body}</Text>
                <SuggestionSwitcher suggestionId={results.s1.$key}></SuggestionSwitcher>
              </View>
              <View style={{ flex: 1, display: 'flex'}}>
                <Text style={{ textAlign: 'center', fontSize: RFValue(18), color: '#fff' }}>Here are some other things to try:</Text>
                <View style={styles.card}>
                  <View style={styles.titleHolder}>
                  <AppIcons name={results.s2.icon} color="#222"></AppIcons>
                  <Text style={styles.cardTitle}>{results.s2.text}</Text>
                  </View>
                  <View style={{ flex: 1, paddingLeft: RFValue(5), justifyContent:'center' }}> 
                    <Text style={{ fontSize: RFValue(11), paddingTop:18, paddingBottom: 30, textAlign:'justify', fontFamily: 'Poppins-Medium' }}>{results.s2.body}</Text>
                    <SuggestionSwitcher suggestionId={results.s2.$key}></SuggestionSwitcher>
                  </View>
                </View>
                <View style={styles.card}>
                  <View style= {styles.titleHolder}>
                  <AppIcons name={results.s3.icon} color="#222"></AppIcons>
                  <Text style={styles.cardTitle}>{results.s3.text}</Text>
                  </View>
                  <View style={{ flex: 1, paddingLeft: RFValue(5) }}>
                    {/* <Text style={styles.cardTitle}>{results.s3.text}</Text> */}
                    <Text style={{ fontSize: RFValue(11), paddingTop:10, fontFamily: 'Poppins-Medium', paddingBottom: 30, textAlign:'justify'}}>{results.s3.body}</Text>
                    <SuggestionSwitcher suggestionId={results.s3.$key}></SuggestionSwitcher>
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
    backgroundColor: 'white',
    paddingTop: RFValue(20)
  },
  card: {
    flex: 1,
    display: 'flex',
    alignSelf:'center',
    alignContent:'center',
    flexDirection: 'column',
    width:'90%',
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
    //overflow: 'hidden',
    padding: RFValue(15),
    margin: RFValue(10),
  },
  cardTitle: {
    fontSize: RFValue(17),
    fontFamily: 'Poppins-Bold',
    paddingLeft:20,
  },
  largeContainer: {
    height:'100%',
    width:'100%'
  },
  iconHolder: {
   padding:20,
   paddingLeft:60
  },
  titleHolder: {
    display: 'flex',
    flexDirection: 'row',
  }
});
