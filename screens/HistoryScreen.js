import * as React from 'react';
import firebase from '../Firebase';
import h from '../globals';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { AuthContext } from '../AuthContext';
import { AppContext } from '../AppContext';
import AppIcons from '../components/AppIcons';
import { AirbnbRating } from 'react-native-ratings';
import { RFValue } from 'react-native-responsive-fontsize';

export default function HistoryScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [userSurveys, setUserSurveys] = React.useState(null);

  React.useEffect(() => {
    // On component load, query firebase for the user's past surveys
    user.ref.child(`profile/pauseSurveys`).on('value', (s) => {
      // Get the response from the firebase query, set the id attribute, and set the userSurveys var
      let data = s.val() || {};
      for (const key in data) data[key].id = key;
      setUserSurveys(Object.values(data).sort((a, b) => b.timestamp > a.timestamp));
    });
  }, []);

  function reviewSuggestion(surveyData) {
    // Find the review by its id, add some more information, and set currentReview
    if (!!surveyData.selected) surveyData.fullSuggestion = hitpause.suggestions[surveyData.selected];
    surveyData.allSuggestionData = Object.values(surveyData.suggestions).map(s => hitpause.suggestions[s]);
    props.navigation.navigate('ReviewScreen', { surveyData });
  }

  function renderSuggestion({ item }) {
    // Render a button for a specific suggestion
    let suggestion = hitpause.suggestions[item.selected] || null;
    return (
      <TouchableOpacity style={styles.suggestionBlock} onPress={() => reviewSuggestion(item)}>
        <Text style={styles.smallText}>Took survey on {h.getDate(item.timestamp)} @ {h.getTime(item.timestamp)}</Text>
        {
          !!suggestion ? (
            <View style={styles.reviewCard}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <AppIcons name={suggestion.icon} color={h.colors.primary} size={30} />
              </View>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={{ fontFamily: 'Poppins-Light' }}>You selected: <Text style={{ fontFamily: 'Poppins-Bold' }}>{suggestion.text}</Text>.</Text>
                {
                  !!item.ratingEffective ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontFamily: 'Poppins-Light' }}>Rated</Text>
                      <AirbnbRating
                        defaultRating={item.ratingEffective}
                        size={12}
                        showRating={false}
                        isDisabled={true}
                        selectedColor={h.colors.accent}
                        starStyle={{ marginHorizontal: 1 }}
                        starContainerStyle={{ marginLeft: 5, marginTop: -5 }}
                      />
                    </View>
                  ) : (
                    <Text style={{ fontFamily: 'Poppins-Light' }}>Tap here to review this survey.</Text>
                  )
                }
              </View>
            </View>
          ) : (
            <View style={styles.reviewCard}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <AppIcons name="fontawesome5:info-circle" color={h.colors.primary} size={30} />
              </View>
              <Text style={{ fontFamily: 'Poppins-Light', flex: 1, paddingLeft: 10 }}>You did not select a suggestion from this survey. Tap here to review this survey.</Text>
            </View>
          )
        }
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.header}>History</Text>
            }
            data={userSurveys}
            renderItem={renderSuggestion}
            vertical={true}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>You haven't taken a survey yet. When you do, your results will appear here.</Text>
            }
          />
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(22),
    paddingHorizontal: 20,
    paddingBottom: RFValue(16),
    paddingTop: 80,
  },
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  suggestionBlock: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: h.colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    alignSelf:'center',
    marginVertical: 10,
    padding: 20
  },
  smallText: {
    fontSize: RFValue(10),
    fontFamily: 'Poppins-Light',
    color: '#333',
    alignSelf: 'center',
    textAlign: 'center',
  },
  emptyText: {
    paddingHorizontal: 40,
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Light',
    color: h.colors.primary
  }
});