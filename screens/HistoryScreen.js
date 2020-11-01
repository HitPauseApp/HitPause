import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import albumImage from '../assets/images/album-placeholder.png';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
import { render } from 'react-dom';
import { AppContext } from '../AppContext';
import StarRating from 'react-native-star-rating';

export default function HistoryScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [userSuggestions, setUserSuggestions] = React.useState(null);
  const [currentReview, setCurrentReview] = React.useState(null);
  const [starRating, setStarRating] = React.useState(null);

  React.useEffect(() => {
    firebase.database().ref(`users/${user.uid}/profile/quizHistory/incidentQuestionnaire`).on('value', (s) => {
      let allUserSuggestions = s.val()
      for (const key in allUserSuggestions) {
        allUserSuggestions[key].id = key;
      }
      setUserSuggestions(Object.values(allUserSuggestions));
    });
  }, []);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  // TODO: move to utility class
  function getDateAndTime(epoch) {
    let date = new Date(epoch);
    let dateString = `${date.getMonth()}/${date.getDate()}/${String(date.getFullYear()).substr(2)}`;
    let timeString = `${(date.getHours() % 12) + 1}:${String(date.getMinutes()).padStart(2, '0')}`;
    let amPmString = date.getHours() < 12 ? 'AM' : 'PM';
    return `${dateString}\n${timeString} ${amPmString}`;
  }

  function reviewSuggestion(id) {
    // TODO: Implement
    let review = {};
    for (const key in userSuggestions) {
      if (userSuggestions[key].id == id) {
        review = userSuggestions[key];
        break;
      }
    }
    console.log('review 1:', review);
    review.fullSuggestion = hitpause.suggestions[review.suggestion];
    console.log('review 2:', review);
    setCurrentReview(review);
    setVisible(true);
    // React.useEffect(() => {
    // }, [currentReview]);
  }

  

  function renderSuggestion({ item }) {
    let suggestion = hitpause.suggestions[item.suggestion] || {};
    return (
      <TouchableOpacity style={styles.suggestionBlock} onPress={() => reviewSuggestion(item.id)}>
        <Text style={styles.smallText}>{suggestion.text}</Text>
        {!!suggestion.iconName && <FontAwesome5 name={suggestion.iconName} size={36} color="black" />}
        <Text style={styles.smallText}>{getDateAndTime(item.timestamp)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>History</Text>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Give these suggestions a review!</Text>
          <FlatList
            data={userSuggestions}
            renderItem={renderSuggestion}
            horizontal={true}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Recent Suggestions</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Recently Liked Suggestions</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Most Frequent Suggestions</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.reviewModal}>
          <Text style={styles.modalText}>{!!currentReview && !!currentReview.fullSuggestion ? currentReview.fullSuggestion.text : ''}</Text>
          <Text style={styles.modalText}>Leave a review!</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starRating}
            selectedStar={(rating) => setStarRating(rating)}
            fullStarColor={'white'}
            starStyle={styles.starRating}
            starSize={30}
          />
        </Modal>
      </Portal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },
  header2: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: '5%',
    marginTop: '7.8%'
  },
  header: {
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    color: 'white'
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
    backgroundColor: '#132090',
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
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10
  },
  smallText: {
    fontSize: 10,
    color: '#333',
    alignSelf: 'center',
    textAlign: 'center'
  },
  starRating: {
    width: '50%'
  },

});