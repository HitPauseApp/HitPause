import * as React from 'react';
import h from '../globals';
import firebase from '../Firebase';
import { TouchableOpacity, StyleSheet, Text, ScrollView, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { AppContext } from '../AppContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import SuggestionCard from '../components/SuggestionCard';
import { AirbnbRating } from 'react-native-ratings';

export default function ReviewScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  let surveyData = props.route.params.surveyData;
  const [showReview, setShowReview] = React.useState(!!surveyData.selected);

  function ratingChanged(type, value) {
    user.ref.child(`profile/pauseSurveys/${surveyData.id}/${type}`).set(value);
    user.ref.child(`profile/badges/firstSuggestionReview`).set(true);
    // Update the user's history profile using the rating
    if (type == 'ratingEffective') {
      user.ref.child(`profile/historyEffects/${surveyData.selected}`).once('value', (s) => {
        let total = s.exists() ? s.val() : 0;
        if (surveyData.ratingEffective != null) total = total - (surveyData.ratingEffective - 3);
        user.ref.child(`profile/historyEffects/${surveyData.selected}`).set(total + value - 3);
        surveyData.ratingEffective = value;
      });
    }
  }

  function handleSuggestionSelect(key) {
    if (!key) return;
    user.ref.child(`profile/pauseSurveys/${surveyData.id}/selected`).set(key);
    surveyData.selected = key;
    setShowReview(true);
  }

  function getFullSuggestion(key) {
    let suggestion = hitpause.suggestions[key];
    suggestion.$key = key;
    return suggestion;
  }

  return (
    <ScrollView style={styles.container}>
      {
        showReview ? (
          <View style={styles.reviewContainer}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: h.colors.primary, fontSize: RFValue(18), paddingBottom: 20 }}>You selected...</Text>
            <SuggestionCard
              suggestion={getFullSuggestion(surveyData.selected)}
              suggestionNumber={null}
            />
            {
              surveyData.selected != '_none' &&
              <View style={{ paddingBottom: 20 }}>
                <Text style={[styles.smallText, { fontFamily: 'Poppins-Medium' }]}>How well did this work for you?</Text>
                <Text style={[styles.smallText, { paddingTop: 0, paddingBottom: 10 }]}>(This is for you.)</Text>
                <AirbnbRating 
                  count={5}
                  showRating={false}
                  defaultRating={surveyData.ratingEffective || 0}
                  onFinishRating={(r) => ratingChanged('ratingEffective', r)}
                  selectedColor={h.colors.accent}
                  reviewColor={h.colors.accent}
                />
                <Text style={[styles.smallText, { fontFamily: 'Poppins-Medium' }]}>In general, was this suggestion appropriate for how you were feeling?</Text>
                <Text style={[styles.smallText, { paddingTop: 0, paddingBottom: 10 }]}>(This is for us.)</Text>
                <AirbnbRating 
                  count={5}
                  showRating={false}
                  defaultRating={surveyData.ratingAppropriate || 0}
                  onFinishRating={(r) => ratingChanged('ratingAppropriate', r)}
                  selectedColor={h.colors.accent}
                  reviewColor={h.colors.accent}
                />
              </View>
            }
          </View>
        ) : (
          <View style={[styles.reviewContainer, { paddingTop: 60 }]}>
            <SuggestionCard
              suggestion={getFullSuggestion(surveyData.suggestions[0])}
              suggestionNumber={1}
              bigNumber={true}
              handleSuggestionSelect={handleSuggestionSelect}
              buttonText="I tried this:"
              />
            <SuggestionCard
              suggestion={getFullSuggestion(surveyData.suggestions[1])}
              suggestionNumber={2}
              handleSuggestionSelect={handleSuggestionSelect}
              buttonText="I tried this:"
              />
            <SuggestionCard
              suggestion={getFullSuggestion(surveyData.suggestions[2])}
              suggestionNumber={3}
              handleSuggestionSelect={handleSuggestionSelect}
              buttonText="I tried this:"
            />
            <TouchableOpacity style={[styles.button, { marginTop: 0, marginBottom: 20 }]} onPress={() => handleSuggestionSelect('_none')}>
              <AppIcons name="materialicons:thumb-down" color="#fff" />
              <Text style={[styles.buttonText, { paddingLeft: 10 }]}>I didn't do any of these</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  reviewContainer: {
     alignItems: 'center',
     paddingTop: 20,
     paddingHorizontal: 20,
     display: 'flex',
     flex: 1
  },
  largeText: {
    fontSize: RFValue(28),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  smallText: {
    fontSize: RFValue(14),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
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
