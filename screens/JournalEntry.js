import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';

export default function JournalEntry({ navigation: { goBack } }) {

    const getCurrentDate=()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      //Alert.alert(date + '-' + month + '-' + year);
      // You can turn it in to your desired format
      return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }

    const currentDate = getCurrentDate();
    const user = React.useContext(AuthContext);

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>{currentDate}</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputTitleStyle}
            placeholder='Note Title...'
            placeholderTextColor='#aaa'
            returnKeyType= 'next'
          />

          <TextInput
            style={styles.inputDescriptionStyle}
            multiline={true}
            placeholder='Note Description...'
            placeholderTextColor='#aaa'
            returnKeyType = 'done'
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
      fontFamily: 'Poppins-Light',
      fontSize: 16,
      textAlignVertical: 'top'
    }
  });
  