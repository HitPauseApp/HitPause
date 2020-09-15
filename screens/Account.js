import * as React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import firebase from '../Firebase.js'

import MatIcons from '../components/MatIcons';
import FillButton from '../components/buttons/FillButton';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import user from '../assets/images/user.png';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {}, uid: firebase.auth().currentUser.uid};
  }
  componentDidMount() {
    this.getUserData(this.state.uid);
    console.log('this.state:', this.state);
  }
  handleLogout() {
    firebase.auth().signOut().then(function () {
      props.navigation.navigate('Login');
    }).catch(function (error) {
      console.error(error);
    });
  }
  getUserData(uid) {
    firebase.database().ref(`users/${uid}`).once('value').then((snapshot) => {
      this.setState({user: snapshot.val()});
      console.log('this.state:', this.state);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={user} style={styles.avatar}></Image>
        <View style={styles.category}>
          <MatIcons name="person"></MatIcons>
          <Text style={styles.text}>{this.state.user.firstName}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <MatIcons name="phone-iphone"></MatIcons>
          <Text style={styles.text}>{}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <MatIcons name="email"></MatIcons>
          <Text style={styles.text}>{this.state.user.email}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <FontAwesome name="spotify" size={30} color="white" />
          {/* This is bad data, only using as placeholder */}
          <Text style={styles.text}>{this.state.uid ? 'Connected' : 'Not Connected'}</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <MaterialCommunityIcons name="textbox-password" size={30} color="white" />
          <Text style={styles.text}>*******</Text>
        </View>
        <FillButton text="EDIT DETAILS"></FillButton>
        <Text
          style={styles.signOut}
          onPress={this.handleLogout}
        >Sign Out</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6E00DD'
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