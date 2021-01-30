import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import user from '../assets/images/user.png';

export default function WelcomeBanner(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Back,</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Text style={styles.headerText}>{props.name}!</Text>
        </View>
        {
          props.isAdmin &&
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => props.navigation.navigate('AdminPanel')}
          >
            <Text style={{ color: 'white', fontStyle: 'italic' }}>(ADMIN)</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    paddingLeft: 10,
    position: 'absolute',
    marginTop: '23%',
    overflow: 'hidden'
  },
  text: {
    fontFamily: 'Poppins-Extra-Light',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    fontFamily: 'Poppins-Light',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },

});
