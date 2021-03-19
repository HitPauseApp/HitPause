/*

  Spotify Playlist and Button
*/

import * as React from 'react';
import { Button, View, StyleSheet, Image, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { RFValue } from 'react-native-responsive-fontsize';

export default function SpotifyButton(props){

  const handlePress = () =>{
    Linking.openURL(props.playlist.webLink);
  }

  return(
    <View>
      <View style={styles.container}>
      <View>
        <Image
        style={styles.spotifyImage}
        source={{
          uri: `${props.playlist.image}`,
        }}
      />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{props.playlist.title}</Text>
        <Text style={styles.bodyText}>Created By: {props.playlist.author}</Text>
      </View>
    </View>
      <Button onPress={handlePress} title="Open In Spotify"></Button>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#132090',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 12,
    flexDirection: "row"
  },
  header: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(20),
    alignSelf:'center',
    right:'0%',
    textAlign: 'center'
  },
  bodyText: {
    color: 'white',
    fontFamily: 'Poppins-Extra-Light',
    marginTop: 5,
    //textAlign: 'center',
  },
  spotifyImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    //alignItems: "center"
    
  }
});
