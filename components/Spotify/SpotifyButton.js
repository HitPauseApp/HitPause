/*

  Button for opening Spotify playlists. Contains the Spotify Playlist display component and a button to open the playlist

  Last edited 11/19 by Drew Weaver
*/

import * as React from 'react';
import { Button, View } from 'react-native';
import * as Linking from 'expo-linking';
import SpotifyPlaylist from './SpotifyPlaylist';

export default function SpotifyButton(props){

  const handlePress = () =>{
    Linking.openURL(props.href);
  }

  return(
    <View>
      <SpotifyPlaylist href={props.href}></SpotifyPlaylist>
      <Button onPress={handlePress} title="Open In Spotify"></Button>
    </View>
  )

}