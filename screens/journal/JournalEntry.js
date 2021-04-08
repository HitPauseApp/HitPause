import * as React from 'react';
import h from '../../globals';
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
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    return month + '/' + date + '/' + year; // format: mm/dd/yyyy;
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
          placeholder='Note title...'
          placeholderTextColor='#aaa'
          returnKeyType='next'
          onChangeText={title => setTitle(title)}
          value={title}
        />
        <TextInput
          style={styles.inputDescriptionStyle}
          multiline={true}
          placeholder='Note description...'
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
      backgroundColor: 'white',
      flex: 1,
    },
    header: {
      fontFamily: 'Poppins-Bold',
      color: h.colors.primary,
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
      color: h.colors.primary,
      height: RFValue(50),
      marginHorizontal: 20,
      fontFamily: 'Poppins-Medium',
      fontSize: RFValue(20),
      borderColor: h.colors.primary,
      borderBottomWidth: 1
    },
    inputDescriptionStyle: {
      color: h.colors.primary,
      flex: 1,
      paddingLeft: 20,
      paddingTop: 15,
      paddingRight: 20,
      marginBottom: 60,
      fontFamily: 'Poppins-Light',
      fontSize: 16,
      textAlignVertical: 'top',
      top: '4%'
    }
  });
  
