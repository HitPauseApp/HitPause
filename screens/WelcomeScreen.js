import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage, ScrollView } from 'react-native';
import firebase from '../Firebase.js';
import { AuthContext } from '../AuthContext.js';
import Swiper from 'react-native-swiper/src';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function WelcomeScreen(props) {
  const user = React.useContext(AuthContext);
  const [count, setCount] = React.useState(0);
  const [screenText, setScreenText] = React.useState([
    "Our goal is to provide each and every user with their own tips and tricks on how to better deal with their anxiety. Click next to take the virtual tour and get started",
    "The journal page is designed to help relieve stress through writing. Hit the pen and paper to start a new entry, or swipe left to delete a previously existing entry",
    "The quiz is 10 questions long and uses an algorithm, along with your answers from the initial assessment to give you some suggestions that are unique to you in the moment",
    "The history page allows you to look back on, and even rate, some of your past suggestions and playlists. Our rating system is designed to get to know what you enjoy, so it can be more accurate in the future"
  ]);
  const [screenHead, setScreenHead] = React.useState([
    "Welcome to the HitPause Family!",
    "Journal Screen",
    "Take the Quiz!",
    "History"
  ]);
  
  

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={false}>
        <View testID="welcome" style={styles.homecard}>
          <View> 
            <Text style={styles.headerText}>Welcome to the HitPause Family!</Text>
            <Text style={styles.bodyText}>Our goal is to provide each and every user with their own tips and tricks on 
              how to better deal with their anxiety. Click next to take the virtual tour and get started
            </Text>  
          </View>
        </View>

        <View testID="journal" style={styles.homecard}>
          <View> 
            <Text style={styles.headerText}>Journaling</Text>
            <Text style={styles.bodyText}>The journal page is designed to help relieve stress through writing. 
              Hit the pen and paper to start a new entry, or swipe left to delete a previously existing entry
            </Text>   
          </View>
        </View>

        <View testID="quiz" style={styles.homecard}>
          <View> 
            <Text style={styles.headerText}>Take our Quiz!</Text>
            <Text style={styles.bodyText}>The quiz is 10 questions long and uses an algorithm, along with your answers from the initial assessment 
              to give you some suggestions that are unique to you in the moment
            </Text>  
          </View>
        </View>

        <View testID="history" style={styles.homecard}>
          <View> 
            <Text style={styles.headerText}>View Your History</Text>
            <Text style={styles.bodyText}>The history page allows you to look back on, and even rate, some of your past suggestions and playlists. 
              Our rating system is designed to get to know what you enjoy, so it can be more accurate in the future
            </Text>  
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Get Started!</Text>
            </TouchableOpacity> 
          </View>
        </View>

      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
  },
  headerText: {
    color: '#00095e',
    textAlign: 'center',
    fontSize: 28,
    padding: 20,
    fontFamily: 'Poppins-Bold',

  },
  bodyText: {
    color: '#00095e',
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
    fontFamily: 'Poppins-Medium',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    padding: 20,
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: '#00095e',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 10,
    height: '90%',
    flex: 1
  }
  
});