import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import WelcomeBanner from '../components/WelcomeBanner';

import SpotifyAuthButton from '../spotify/SpotifyAuthButton';

export default function LikesScreen() {

  const NAME = "My Likes"

  return (
    <View style={styles.container}>
        <WelcomeBanner NAME={NAME}></WelcomeBanner>
        <SpotifyAuthButton></SpotifyAuthButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#040926'
  },
});