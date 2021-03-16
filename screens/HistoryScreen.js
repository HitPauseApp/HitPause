import * as React from 'react';
import firebase from '../Firebase';
import h from '../globals';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { AuthContext } from '../AuthContext';
import { AppContext } from '../AppContext';
import StarRating from 'react-native-star-rating';
import AppIcons from '../components/AppIcons';
import ReviewScreen from './ReviewScreen';
import { RFValue } from 'react-native-responsive-fontsize';
import { getCurrentTimeInSeconds } from 'expo-auth-session/build/TokenRequest';

export default function HistoryScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [userSurveys, setUserSurveys] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [currentReview, setCurrentReview] = React.useState(null);

  React.useEffect(() => {
    // On component load, query firebase for the user's past surveys
    user.ref.child(`profile/pauseSurveys`).on('value', (s) => {
      // Get the response from the firebase query, set the id attribute, and set the userSurveys var
      let data = s.val() || {};
      for (const key in data) data[key].id = key;
      setUserSurveys(Object.values(data).sort((a, b) => b.timestamp > a.timestamp));
    });
  }, []);

  function handleRatingChanged(id, rating) {
    // Update the suggestion's rating
    user.ref.child(`profile/pauseSurvey/${id}`).update({ starRating: rating });
    setCurrentReview({...currentReview, starRating: rating});
  }

  function reviewSuggestion(surveyData) {
    // Find the review by its id, add some more information, and set currentReview
    if (!!surveyData.selected) surveyData.fullSuggestion = hitpause.suggestions[surveyData.selected];
    surveyData.allSuggestionData = Object.values(surveyData.suggestions).map(s => hitpause.suggestions[s]);
    setCurrentReview(surveyData);
    setVisible(true);
  }

  function removeSuggestion(){
    setVisible(false);
    if(currentReview.starRating >= 0.5){

    }
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
              <AppIcons name={suggestion.icon} color={h.colors.primary} />
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text>You selected: <Text style={{ fontFamily: 'Poppins-Bold' }}>{suggestion.text}</Text>. Tap here to review this survey.</Text>
              </View>
            </View>
          ) : (
            <View style={styles.reviewCard}>
              <AppIcons name="fontawesome5:info-circle" color={h.colors.primary} />
              <Text style={{ flex: 1, paddingLeft: 10 }}>You did not select a suggestion from this survey. Tap here to review this survey.</Text>
            </View>
          )
        }
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>History</Text>
      <ScrollView>
        <View style={styles.textContainer}>
          {/* <Text style={styles.header}>Give these suggestions a review!</Text> */}
          <FlatList
            data={userSurveys}
            renderItem={renderSuggestion}
            vertical={true}
            keyExtractor={item => item.id}
          />
          {/* <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <Portal>
        {
          !!currentReview &&
          <Modal visible={visible} onDismiss={removeSuggestion} contentContainerStyle={styles.reviewModal}>
            {
              !!currentReview.selected ? (
                <View>
                  <Text style={styles.modalText}>{currentReview.fullSuggestion.text}</Text>
                  <Text style={styles.modalText}>Leave a review!</Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={currentReview.starRating}
                    selectedStar={(rating) => handleRatingChanged(currentReview.id, rating)}
                    fullStarColor={'white'}
                    starStyle={styles.starRating}
                    starSize={30}
                  />
                </View>
              ) : (
                <View>
                  <Text>Which of these actions did you take?</Text>
                  {
                    currentReview.allSuggestionData.map((s) => {
                      <View style={{ height: 50 }}>
                        <TouchableOpacity>
                          <Text>{s.text}</Text>
                        </TouchableOpacity>
                      </View>
                    })
                  }
                </View>
              )
            }
          </Modal>
        }
      </Portal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header2: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(22),
    // fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: RFValue(16),
    //paddingVertical: '5%',
    paddingTop: 80,
    // marginTop: '7.8%'
  },
  header: {
     padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    // paddingTop: 65,
    color: 'white'
  },
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgBackground: {
    width: '100%',
    height: '20%'
  },
  recentTab: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  reviewModal:{
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
  modalText:{
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  buttonContainer: {
    margin: 10,
    padding: 10
  },
  textContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#132090',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Extra-Light',
    padding: 15
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
    fontSize: 10,
    color: '#333',
    alignSelf: 'center',
    textAlign: 'center',
  },
  starRating: {
    
  },

});