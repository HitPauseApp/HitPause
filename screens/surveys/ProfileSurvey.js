import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Form from '../../components/forms/Form';
import Loading from '../Loading';
import { AuthContext } from '../../AuthContext.js';
import { AppContext } from '../../AppContext.js';
import { RFValue } from 'react-native-responsive-fontsize';
import AppIcons from '../../components/AppIcons.js';

export default function ProfileSurvey(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [surveyComplete, setSurveyComplete] = React.useState(false);
  const [survey, setSurvey] = React.useState({});

  React.useEffect(() => {
    // Get survey config from firebase
    hitpause.ref.child(`surveys/profileSurvey`).once('value').then(s => {
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
    let data = {};
    // For each object in the effects array
    for (const key in effects) {
      // For each property in the flag object, add it to the data object
      for (const traitFlag in effects[key]) data[traitFlag] = effects[key][traitFlag];
    }
    // If traits does not exist (and will be created) add the profile survey badge
    if (user.ref.child('profile/traits').once('value').then(s => !s.exists())) {
      user.ref.child('profile/badges/profileSurvey').set(Date.now());
    }
    user.ref.child('profile/traits').set(data);
    setSurveyComplete(true);
  }

  if (isLoading) return <Loading message="Loading your survey..."></Loading>;
  else {
    return (
      <View style={styles.container}>
        {
          !surveyComplete ? (
            <View style={{ width: '100%', height: '100%' }}>
              <Form survey={survey} onSubmit={handleSubmit}></Form>
            </View>
          ) : (
            <View style={styles.completedContainer}>
              <Text style={styles.bigText}>You're all set up!</Text>
              <Text style={styles.smallText}>Thank you for helping us help you!</Text>
              <Text style={styles.smallText}>We'll use this information to tailor our suggestions to you.</Text>
              
              {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity> */}

              <Text style={styles.smallerText}>See the results of your survey here!</Text>
              <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AccountTraits')}>
                <Text style={styles.buttonText}>My Account Traits</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: RFValue(20)
  },
  endCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(20),
    overflow: 'hidden',
    padding: RFValue(10),
    height: RFValue(160)
  },
  completedContainer: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
  bigText: {
    textAlign: 'center',
    color: h.colors.primary, 
    fontSize: RFValue(50),
    //paddingTop: 20,
    fontFamily: 'Poppins-Bold',
  },
  smallText: {
    textAlign: 'center',
    color: h.colors.primary, 
    fontSize: RFValue(25),
    padding: 20,
    fontFamily: 'Poppins-Medium',
  },
  smallerText: {
    textAlign: 'center',
    color: h.colors.primary, 
    fontSize: RFValue(15),
    paddingTop: 30,
    fontFamily: 'Poppins-Light',
  },
  button: {
    backgroundColor: h.colors.primary,
    alignSelf: 'center',
    borderRadius: RFValue(15),
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
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: RFValue(14),
    paddingLeft: 20,
    paddingRight: 20,
  }
});
