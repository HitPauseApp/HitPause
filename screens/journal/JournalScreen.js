import * as React from 'react';
import firebase from '../../Firebase';
import h from '../../globals';
import { StyleSheet, Text, View, Image, TouchableOpacity, PanResponsder, ImageBackground } from 'react-native';
import { PanGestureHandler, RectButton, ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../../AuthContext';
import JournalCard from '../../components/JournalCard';
import { TextInput } from 'react-native';
import AppIcons from '../../components/AppIcons';
import { RFValue } from 'react-native-responsive-fontsize';

export default function JournalScreen(props) {
  const user = React.useContext(AuthContext);
  const [entries, setEntries] = React.useState(null);
  const [displayEntries, setDisplayEntries] = React.useState(null)

  React.useEffect(() => {
    // TODO: Get and store these locally
    user.ref.child(`journal`).on('value', (s) => {
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
    if (!entryId) {
      entryId = firebase.database().ref().push().key;
      // If entries is empty (and we are creating our first entry) award a badge
      if (entries && entries.length == 0) user.ref.child('profile/badges/firstJournalEntry').set(Date.now());
      // If there are 4 entries (and we are creating our fifth entry) award a badge
      if (entries && entries.length == 4) user.ref.child('profile/badges/fiveJournalEntries').update(Date.now());
    }
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
        <Text style={styles.header}>Journal</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={h.colors.primary}
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
              <Text style={[styles.text, { marginTop: 20, paddingHorizontal: 40 }]}>No journal entries yet, use the button below to create one!</Text>
            )
          }
        </ScrollView>
      </View>
     
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => openEntry(null, '', '')}>
          <AppIcons name="fontawesome5:pencil-alt" size={32} color="#F2FCFD"></AppIcons>
        </TouchableOpacity>
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
    // fontWeight: 'bold',
    paddingHorizontal: 20,
    //paddingVertical: '9%',
    paddingTop: 65,
    //paddingBottom: 1
  },
  textContainer: {
    backgroundColor: h.colors.secondary,
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    elevation: 3,
    borderRadius: RFValue(15),
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row-reverse',
    right: '6%',
    bottom: '3%',
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: h.colors.primary,
    justifyContent: 'center',
    alignItems:'center'
  },
  text: {
    textAlign: 'center',
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(14),
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: h.colors.primary,
    borderBottomWidth: 1,
    marginTop: 20,
    zIndex: 3,
    alignSelf: 'center',
  },

});
