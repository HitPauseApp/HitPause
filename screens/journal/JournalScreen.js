import * as React from 'react';
import firebase from '../../Firebase';
import { StyleSheet, Text, View, Image, TouchableOpacity, PanResponsder, ImageBackground } from 'react-native';
import { PanGestureHandler, RectButton, ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../../AuthContext';
import JournalCard from '../../components/JournalCard';
import { TextInput } from 'react-native';
import AppIcons from '../../components/AppIcons';

export default function JournalScreen(props) {
  const user = React.useContext(AuthContext);
  const [entries, setEntries] = React.useState(null);
  const [displayEntries, setDisplayEntries] = React.useState(null)

  React.useEffect(() => {
    // TODO: Get and store these locally
    firebase.database().ref(`users/${user.uid}/journal`).on('value', (s) => {
      if (s.exists()) {
        setEntries(Object.entries(s.val()).sort((a, b) => b[1].dateModified - a[1].dateModified));
        setDisplayEntries(Object.entries(s.val()).sort((a, b) => b[1].dateModified - a[1].dateModified));
      }
      // If journal does not exist, set entries to blank arrays
      else {
        setEntries([]);
        setDisplayEntries([]);
      }
    });
  }, []);

  function openEntry(entryId, title, text) {
    // If there is no entryId (we are creating a new entry) get a new push ID from Firebase
    if (!entryId) entryId = firebase.database().ref().push().key;
    // Pass the existing (or new) entryId to JournalEntry as a parameter and navigate there
    props.navigation.navigate('JournalEntry', { entryId: entryId, title: title, text: text });
  }

  function deleteEntry(entryId) { 
    firebase.database().ref('users/' + user.uid +'/journal/').child(entryId).remove()
  }

  function searchEntries(searchText) {
    if (searchText != '' && entries) {
      let filteredEntries = Object.values(entries)
      .filter((entry) => (entry[1].title + entry[1].text).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
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
            !!displayEntries && displayEntries.length > 0 ? ( 
              displayEntries.map((item, key) =>
                <View
                  key={key} 
                >
                  <JournalCard 
                    deleteEntry = {() => deleteEntry(item[0])} 
                    openEntry={() => openEntry(item[0], item[1].title, item[1].text)} 
                    entry={item[1]} id={item[0]}>
                  </JournalCard>  
                </View>
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
          <AppIcons name="fontawesome5:pencil-alt" size={40} color="white"></AppIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: '9%',
  },
  textContainer: {
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20,
    height: 150
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row-reverse',
    right: '8%',
    bottom: '3%',
    position: 'absolute'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-Medium',
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
  }
});
