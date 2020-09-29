import * as React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import firebase from '../Firebase.js'

import MatIcons from '../components/MatIcons';
import FillButton from '../components/buttons/FillButton';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from './Loading';
import userImg from '../assets/images/user.png';


export default function Account(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [user, setUser] = React.useState({});
  
  function handleLogout() {
    firebase.auth().signOut().then(() => {
      props.navigation.navigate('Login');
    }).catch((error) => {
      console.error(error);
    });
  }
  
  // Eventually, we will want to put this logic into BottomTabNavigator, so the whole app has access to 'user'
  React.useEffect(() => {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(s => {
      setUser(s.val());
      setLoadingComplete(true);
    });
  }, []);
  
  if (!isLoadingComplete) {
    return <Loading></Loading>;
  } else {
    return (
      <View style={styles.container}>
        <Image source={userImg} style={styles.avatar}></Image>
        <View style={styles.category}>
          <MatIcons name="person"></MatIcons>
          <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <MatIcons name="phone-iphone"></MatIcons>
          <Text style={styles.text}>{}</Text>
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
          <Text style={styles.text}>{user ? 'Connected' : 'Not Connected'}</Text>
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
    );
  }
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
  }
});