import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function App(props) {
  return (
    <Button
      title="Login to Spotify"
      onPress={props.handleSpotifyLogin}
    />
  );
}


