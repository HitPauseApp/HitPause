import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      user.ref.child('profile/badges').update({ profileSurvey: true });
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
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <View style={ styles.endCard }>
                <Text>You're all set up! We'll use this information to tailor our suggestions to you.</Text>
              </View>
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
    backgroundColor: h.colors.primary,
    paddingTop: RFValue(20)
  },
  endCard: {
    backgroundColor: '#fff',
    borderRadius: RFValue(20),
    overflow: 'hidden',
    padding: RFValue(10),
    height: RFValue(160)
  }
});
