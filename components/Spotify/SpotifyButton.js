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
   // justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '95%',
    //height:'20%',
    alignSelf: 'center',
    borderRadius: 10,
   // padding: 10,
    //bottom: 10,
   // margin: 12,
   paddingVertical:'3%',
    flexDirection: "row"
  },
  header: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(11),
    alignSelf:'flex-start',
    //right:'0%',
    //textAlign: 'center',
    flex:1,
    paddingLeft:'28%',
    paddingTop:'13%'
  },
  bodyText: {
    color: 'white',
    flex:1,
    fontFamily: 'Poppins-Extra-Light',
    //marginTop: 5,
    //textAlign: 'center',
    alignSelf:'flex-start',
    fontSize:RFValue(9),
    paddingLeft:'28%',
    paddingBottom:'10%'
  },
  spotifyImage: {
    width: 111,
    height: 111,
    alignSelf:'flex-start',
    left:'15%',
  },
  textContainer: {
    //alignItems: "center",
    //backgroundColor:'yellow',
    width:'50%'
    //flex:1,
    
   
  }
});
