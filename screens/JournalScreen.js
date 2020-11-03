import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import firebase from '../Firebase';
import { StyleSheet, Text, View, Image, TouchableOpacity, PanResponsder, ImageBackground } from 'react-native';
import { PanGestureHandler, RectButton, ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import JournalCard from '../components/JournalCard';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import Swipeout from 'react-native-swipeout';

// import {SwipeableGesture} from './SwipeGesture';




export default function JournalScreen(props) {
  const user = React.useContext(AuthContext);
  const [entries, setEntries] = React.useState(null);
  const [displayEntries, setDisplayEntries] = React.useState(null)


  React.useEffect(() => {
    // TODO: Get and store these locally
    firebase.database().ref(`users/${user.uid}/journal`).on('value', (s) => {
      setEntries(s.val());
      setDisplayEntries(s.val());
    });
  }, []);

  const onPress = () => props.navigation.navigate("HomeScreen");
  

  const openEntry = (entryId, title, text) => {
    // If there is no entryId (we are creating a new entry) get a new push ID from Firebase
    if (!entryId) entryId = firebase.database().ref().push().key;
    // Pass the existing (or new) entryId to JournalEntry as a parameter and navigate there
    props.navigation.navigate('JournalEntry', { entryId: entryId, title: title, text: text });
  }

  const deleteEntry = (entryId) => {
    firebase.database().ref('users/' + user.uid +'/journal/').child(entryId).remove()
  }

  const searchEntries = (searchText) => {
    if (searchText != '') {
      let filteredEntries = Object.values(entries)
      .filter((entry) => (entry.title + entry.text).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
      setDisplayEntries(filteredEntries);
    } else {
      setDisplayEntries(entries);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>My Journal</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={text => searchEntries(text)}
        />
        <ScrollView>
          {
            !!displayEntries && Object.entries(displayEntries).length > 0 ? (
              Object.entries(displayEntries).map((item, key) =>
                // <TouchableOpacity key={key} onPress={() => openEntry(item[0], item[1].title, item[1].text)}>  
                    <JournalCard 
                        key={key} 
                        deleteEntry = {() =>deleteEntry(item[0])} 
                        openEntry={() => openEntry(item[0], item[1].title, item[1].text)} 
                        entry={item[1]} id={item[0]}>

                    </JournalCard>  
                // </TouchableOpacity>    
                )
            ) : (
              <View style={styles.textContainer}>
                <Text style={styles.text}>No journal entries here...</Text>
              </View>
            )
          }
        </ScrollView>
      </View>
     
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => openEntry(null, '', '')}>
          <FontAwesome name="pencil-square-o" size={40} color="white" />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.buttonView2}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <FontAwesome name="trash-o" size={40} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    //justifyContent: "center",
    flex: 1,
    // [TOS] This line below is throwing an error
    // vertical: true
  },
  container2: {
    backgroundColor: '#00095e',
    flex: 1,
    marginTop: '0%'
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: '9%',
  },
  pic: {
    flex: 1,
    flexDirection: 'row',
    bottom: '30%',
  },
  pic2: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  contentContainer: {
    flex: 1
  },
  button1: {
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 55/2,
    // flexBasis: 'column',
    borderColor: 'white'
  },
  button2: {
    // flexBasis: 'column'

  },
  textContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20
  },
  img: {
    width: '50%',
    height: '50%',
  },
  imgBackground: {
    width: '70%',
    height: '70%',
    bottom: -7,
    right: -7
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row-reverse',
    right: '8%',
    bottom: '3%',
    position: 'absolute'
  },
  buttonView2: {
    flex: 1,
    bottom: '4%',
    left: '8%',
    position: 'absolute',
    //flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    color: '#00095e',
    fontFamily: 'Poppins-Extra-Light',
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    color: 'white',
    borderBottomWidth: 1,
    marginTop: 20,
    zIndex: 3,
    alignSelf: 'center',
  },

});
