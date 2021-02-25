import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../../AuthContext';
import firebase from '../../Firebase';

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

  // const getCurrentTime = () => {
  //   var hours = new Date().getHours();
  //   var minutes = new Date().getMinutes();
  //   var seconds = new Date().getSeconds();
  //   return hours + ':' + minutes + ':' + seconds // format: hours:minutes:seconds;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{getCurrentDate()}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputTitleStyle}
          placeholder='Note Title...'
          placeholderTextColor='#aaa'
          returnKeyType='next'
          //selectionColor='#00095e'
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
      paddingTop: '15%',
      backgroundColor: 'white',
      flex: 1,
    },
    header: {
      fontFamily: 'Poppins-Bold',
      color: '#00095e',
      fontSize: RFValue(24),
      fontWeight: 'bold',
      paddingHorizontal: '5%',
      paddingVertical: '5%'
    },
    backButton: {
      paddingLeft: '3%',
    },
    textInputContainer: {
      flex: 1
    },
    inputTitleStyle: {
      color: '#00095e',
      height: 60,
      paddingTop: 5,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 0,
      fontFamily: 'Poppins-Medium',
      fontSize: 20
    },
    inputDescriptionStyle: {
      color: '#00095e',
      flex: 1,
      paddingLeft: 20,
      paddingTop: 15,
      paddingRight: 20,
      marginBottom: 60,
      fontFamily: 'Poppins-Light',
      fontSize: 16,
      textAlignVertical: 'top',
    }
  });
  
