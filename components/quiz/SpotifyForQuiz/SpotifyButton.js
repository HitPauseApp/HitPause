import * as React from 'react';
import { Button } from 'react-native';
import * as Linking from 'expo-linking';

export default function SpotifyButton(props){

  const handlePress = () =>{
    Linking.openURL(props.href);
  }

  return(
    <Button onPress={handlePress} title="Open In Spotify"></Button>
  )

}