import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage } from 'react-native';
import firebase from '../Firebase.js';
import { AuthContext } from '../AuthContext.js';


import MatIcons from '../components/MatIcons';
import FillButton from '../components/buttons/FillButton';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import SpotifyAuthButton from '../spotify/SpotifyAuthButton';
import userImg from '../assets/images/user.png';


export default function Account(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(true);
  const user = React.useContext(AuthContext);
  
  function handleLogout() {
    firebase.auth().signOut().catch((error) => {
      console.error(error);
    });
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}> 
      <Image source={userImg} style={styles.avatar}></Image>
      <View style={styles.category}>
        <MatIcons name="person"></MatIcons>
        <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.category}>
        <MatIcons name="email"></MatIcons>
        <Text style={styles.text}>{user.email}</Text>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.category}>
        <FontAwesome name="spotify" size={30} color="white" />
        {/* This is bad data, only using as placeholder */}
        {/* <Text style={styles.text}>{user ? 'Connected' : 'Not Connected'}</Text> */}
        <SpotifyAuthButton></SpotifyAuthButton>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.category}>
        <MaterialCommunityIcons name="textbox-password" size={30} color="white" />
        <Text style={styles.text}>*******</Text>
      </View>
      <FillButton text="EDIT DETAILS"></FillButton>
      <Text
        style={styles.signOut}
        onPress={() => handleLogout()}
      >Sign Out</Text>
      </View>
      <Text
        style={styles.deleteData}
        onPress={() => {
          AsyncStorage.removeItem('userData');
        }}
      >Delete Local Account Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00095e'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30
  },
  contentContainer: {
    flex: 1,
    paddingTop: '15%'
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: '80%',
    alignSelf: 'center',
    margin: 20.5
  },
  category: {
    flexDirection: "row",
    marginLeft: 40
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 20
  },
  signOut: {
    color: 'white',
    alignSelf: 'center',
  },
  deleteData: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 20
  }
});