import * as React from 'react';
import h from '../globals';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { AppContext } from '../AppContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import SuggestionCard from '../components/SuggestionCard';
import { AirbnbRating } from 'react-native-ratings';

export default function ReviewScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [showReview, setShowReview] = React.useState(false);
  let surveyData = props.route.params.surveyData;

  function ratingChanged(type, value) {
    user.ref.child(`profile/pauseSurveys/${surveyData.id}/${type}`).set(value);
    user.ref.child(`profile/badges/firstSuggestionReview`).set(true);
    // Update the user's history profile using the rating
    if (type == 'ratingEffective') {
      user.ref.child(`profile/historyProfile/${surveyData.selected}-${surveyData.timestamp}`).set(value - 3);
    }
  }

  function handleSuggestionSelect(key) {
    if (key && key !== '$none') user.ref.child(`profile/pauseSurveys/${surveyData.id}`).update({ selected: key });
    surveyData.selected = key;
    setShowReview(true)
  }

  function getFullSuggestion(key) {
    let suggestion = hitpause.suggestions[key];
    suggestion.$key = key;
    return suggestion;
  }

  return (
    <ScrollView style={styles.container}>
      {
        !!surveyData.selected ? (
          <View style={styles.reviewContainer}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: h.colors.primary, fontSize: RFValue(18), paddingBottom: 20 }}>You selected...</Text>
            <SuggestionCard
              suggestion={getFullSuggestion(surveyData.selected)}
              suggestionNumber={null}
            />
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
  }
});
