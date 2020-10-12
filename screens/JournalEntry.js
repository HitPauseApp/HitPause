import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import JournalCard from '../components/JournalCard';

export default function JournalEntry(props) {

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
      <View style={styles.contentContainer}> 
        <ScrollView>
            <Text style={styles.header}>{currentDate}</Text>
        {/* {
          !!user.journal && Object.values(user.journal).length > 0 ? (
            Object.values(user.journal).map((item, key) =>
              <JournalCard entry={item} key={key}></JournalCard>)
          ) : (
            // TODO: This needs to be styled yet
            <Text>Nothing here yet. Add your first journal entry below!</Text>
          )
        } */}
        </ScrollView>
      </View>

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
    header: {
      fontFamily: 'Poppins-Medium',
      color: 'white',
      fontSize: 26,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    buttonView: {
      flex: 1,
      flexDirection: 'row-reverse',
      right: '8%',
      bottom: '3%',
      position: 'absolute'
      
    },
    addButton: {
      color: 'white',
      fontSize: 25,
      paddingVertical: 3,
      paddingHorizontal: 13
    },
    button:{
      backgroundColor: 'white',
      //bottom: -15,
      //right: -40,
      width: 55,
      height: 55,
      borderRadius: 55/2,
      //borderWidth: 2,
      flexBasis: 'column',
      borderColor: 'white'
    },
    contentContainer: {
      paddingTop: 15,
      flex: 1
    },
    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#ededed',
    },
    imgBackground: {
      width: '70%',
      height: '70%',
      bottom: -7,
      right: -7
  
      //alignSelf: 'left',
      //resizeMode: 'cover',
      //position: 'center',
      //top: 20,
  },
    imageContainer: {
      backgroundColor: '#00095e',
      flex: 1,
    },
    lastOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
    }
  });
  