import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Form from '../../components/forms/Form';
import SuggestionSwitcher from '../../components/forms/SuggestionSwitcher';
import Loading from '../Loading';
import { AuthContext } from '../../AuthContext.js';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppContext } from '../../AppContext.js';
import AppIcons from '../../components/AppIcons.js';
import SuggestionCard from '../../components/SuggestionCard';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

export default function PauseSurvey(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState({});
  const [pushId, setPushId] = React.useState(null);
  const [survey, setSurvey] = React.useState({});
  const [selected, setSelected] = React.useState(null);

 

  React.useEffect(() => {
    // Get survey config from firebase
    hitpause.ref.child(`surveys/pauseSurvey`).once('value').then(s => {
      let surveyData = s.val();
      let questionList = surveyData.questions;
      if (!surveyData.dynamic) {
        let sortedQuestionList = Object.values(questionList).sort((a, b) => a.order - b.order);
        surveyData.questions = sortedQuestionList.slice();
      }
      setSurvey(surveyData);
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
    // Get the user's history profile
    let historyEffects = await user.ref.child(`profile/historyEffects`).once('value').then(s => s.val() || {});
    for (const key in historyEffects) historyEffects[key] = historyEffects[key] / 10;
    console.log(historyEffects);

    // Tally the output flags, filter for the three highest, and randomize them
    let outputFlags = h.tallyOutputFlags([...effects, ...traitEffects, historyEffects]);
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
      user.ref.child('profile/badges/firstPauseSurvey').set(Date.now());
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
    if (!key) return;
    user.ref.child(`profile/pauseSurveys/${pushId}/selected`).set(key);
    setSelected({ ...hitpause.suggestions[key], $key: key });
    
  }

  if (isLoading) return <Loading message="Loading your survey..."></Loading>;
  else {
    return (
      <View style={styles.container}>
        {
          !Object.keys(results).length ? (
            <View style={{ width: '100%', height: '100%' }}>
              <Form survey={survey} onSubmit={handleSubmit}></Form>
            </View>
          ) : (
            !selected ? (
              <ScrollView style={{ display: 'flex' }}>
                <Text style={{ textAlign: 'center', color: h.colors.primary, fontSize: RFValue(18), fontFamily: 'Poppins-Medium', paddingVertical: 40 }}>Here are our suggestions for you!</Text>
                <View style={{ flex: 1, display: 'flex', paddingHorizontal: 30, paddingTop: 20 }}>
                  <SuggestionCard
                    suggestion={results.s1}
                    bigNumber={true}
                    suggestionNumber='1'
                    handleSuggestionSelect={handleSuggestionSelect}
                  />
                  <SuggestionCard
                    suggestion={results.s2}
                    suggestionNumber='2'
                    handleSuggestionSelect={handleSuggestionSelect}
                  />
                  <SuggestionCard
                    suggestion={results.s3}
                    suggestionNumber='3'
                    handleSuggestionSelect={handleSuggestionSelect}
                  />
                  <TouchableOpacity style={[styles.button, { marginTop: 0, marginBottom: 20 }]} onPress={() => handleSuggestionSelect('_none')}>
                    <AppIcons name="materialicons:thumb-down" color="#fff" />
                    <Text style={[styles.buttonText, { paddingLeft: 10 }]}>I don't want to do any of these</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
                <ScrollView style={styles.container1}>
                    <Text style={styles.header}> Thank you for filling out the survey!</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: h.colors.primary, fontSize: RFValue(12), alignSelf:'center', marginTop:'10%'}}>You selected:</Text>
                    <View style = {styles.suggestionIcon}>
                      <AppIcons name={selected.icon} color={h.colors.primary} size={80} style={styles.suggestionIcon}/>
                    </View> 
                    <Text style={styles.suggestionHeader}>{selected.text}</Text>
                    <View style={styles.bodyContainer}>
                      <Text style={styles.suggestionBody}>{selected.body}</Text>
                    </View>

                    <View style={styles.spotifyContainer}>
                      <SuggestionSwitcher suggestionId={selected.$key}></SuggestionSwitcher>  
                    </View>
                    
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Home')}>
                          <LottieView style ={styles.playButton} source={require('../../assets/images/playButton6.json')} autoPlay loop />
                    </TouchableOpacity>

                    <LottieView style ={styles.animation} source={require('../../assets/images/confetti.json')} autoPlay/>


                    <Text style={styles.buttonDescr}>Hit the Play button</Text>
                    

                    
                </ScrollView>
                // {/* Selection success JSX goes here */}
                
            )
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
  container1: {
    backgroundColor: 'white',
    flex: 1
  },
  bodyContainer: {
    width:'90%',
    // backgroundColor: 'yellow',
    alignSelf:'center',
    marginTop:'8%'
  },
  spotifyContainer: {
    width:'90%',
    alignSelf:'center'
  },
  header: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(16),
    alignSelf:'center',
    paddingHorizontal: 20,
    zIndex:999,
    //paddingVertical: '9%',
    paddingTop: 40,
    //paddingBottom: 1
  },
  suggestionHeader: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(16),
    alignSelf:'center'
  },
  suggestionBody: {
    fontFamily: 'Poppins-Medium',
    color: h.colors.primary,
    fontSize: RFValue(14),
    alignSelf:'center',
    textAlign:'justify'
  },
  suggestionIcon: {
    color: h.colors.primary,
    alignSelf:'center',
    //height:'50%'
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
    backgroundColor: h.colors.secondary,
    borderRadius: RFValue(20),
    padding: 20,
    marginBottom: 40
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
    borderRadius: 999,
    paddingTop:'3.5%'
  },
  bigNumberNote: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: h.colors.accent,
    color: '#fff',
    paddingLeft: 30,
    fontFamily: 'Poppins-Medium',
    borderRadius: 999,
    height: RFValue(28),
    fontSize: RFValue(13),
    paddingRight: 16,
    textAlignVertical: 'center',
    top: RFValue(14),
    left: RFValue(36),
    paddingTop:'1.5%',
    paddingLeft:'10%'
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
    borderRadius: 999,
    paddingTop:'25%'
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
  },
  animation: {
    height:'100%',//RFValue(1000),
  //    width:'100%',
    alignSelf:'center',
  //   backgroundColor:'rgba(52, 52, 52, 0)'
  backgroundColor:'transparent',
  position:'absolute',
  //paddingTop:0
},
playButton: {
  // position:'relative',
  width:'100%',
  height:'100%',
  alignSelf:'center',
  right:'1%',
//  paddingLeft:'11%',
  backgroundColor:'transparent',

},
buttonContainer:{
  alignSelf:'center',
  marginTop:'5%',
  //backgroundColor: 'yellow',
  height:'12%',
  width:'22%',
  zIndex:999
},
buttonDescr: {
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(18),
    color: h.colors.primary,
    alignSelf:'center',
    paddingBottom:'10%'
}
});


//500
//500
//8
//8.25