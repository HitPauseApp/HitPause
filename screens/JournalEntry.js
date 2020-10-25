import { Poppins_100Thin_Italic } from '@expo-google-fonts/poppins';
import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import firebase from '../Firebase';

export default function JournalEntry({ navigation: { goBack }, ...props }) {
  const user = React.useContext(AuthContext);
  const [title, setTitle] = React.useState(props.route.params.title || '');
  const [text, setText] = React.useState(props.route.params.text || '');

  React.useEffect(() => {
    let update = {
      title: title,
      text: text,
      dateModified: Date.now()
    };
    // Only update if title and text have values
    if (update.title || update.text) {
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}/journal/${props.route.params.entryId}`).update(update);
    }
  }, [title, text]);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year; // format: dd-mm-yyyy;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>{getCurrentDate()}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputTitleStyle}
          placeholder='Note Title...'
          placeholderTextColor='#aaa'
          returnKeyType='next'
          onChangeText={title => setTitle(title)}
          value={title}
        />
        <TextInput
          style={styles.inputDescriptionStyle}
          multiline={true}
          placeholder='Note Description...'
          placeholderTextColor='#aaa'
          returnKeyType='done'
          onChangeText={text => setText(text)}
          value={text}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#00095e',
    flex: 1,
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backButton: {
    paddingLeft: 5,
  },
  textInputContainer: {
    flex: 1
  },
  inputTitleStyle: {
    color: 'white',
    height: 60,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    fontFamily: 'Poppins-Medium',
    fontSize: 20
  },
  inputDescriptionStyle: {
    color: 'white',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 60,
    fontFamily: 'Poppins-light',
    fontSize: 16,
    textAlignVertical: 'top'
  }
});
