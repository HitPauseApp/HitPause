import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpotifyButton from '../Spotify/SpotifyButton';

export default function SuggestionSwitcher(props) {
  /*
    TODO
    [ ] Make buttons integrated and open in Spotify App (big big undetaking)
    [ ] Add in other suggestion things
  */
  switch (props.suggestionId || '') {
    case 'walk':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWUxMV4K56wKL?si=OvfZ65J_QSGlNd11tc8Iuw"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0?si=xGAZsK7HQsWrkEuNeqWS6g"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX1bomZH0Sueq?si=o_gChwdtRSmg0Rzjc8-Xzg"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX9B1hu73DioC?si=3i6KmA--RBi9aVggiR0z3Q"></SpotifyButton>
        </View>
      )
    case 'journal':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=g0YSuUjmSym75B5t9V2P7w"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX9RwfGbeGQwP?si=oXnJvrCXS9y3_Mfy2TeCIw"></SpotifyButton>
        </View>
      )
    case 'meditate_yoga':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DXdVyc8LtLi96?si=pxtgwChvT-27RGlI7KeYjA"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u?si=hUmgBfU3QyqM6aMzJq06oA"></SpotifyButton>
        </View>
      )
    case 'music':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY?si=tBknCWE6QKSdcPTUtCI-6g"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWT7XSlwvR1ar?si=2LJ6Y_dQRteIn3FKtJmYtw"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1EFhBNP4nlD4eL?si=hQiLK8_sToeh_of9bFXdZA"></SpotifyButton>
        </View>
      )
    case 'break':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6?si=tNfeNoghQXiOSXZh72bEZg"></SpotifyButton>
        </View>
      )
    case 'exercise':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP?si=DsxCYzfrROWnEqS2y3zrUQ"></SpotifyButton>
        </View>
      )
    case 'fresh_air':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWUxMV4K56wKL?si=c_4e_4dFQSSjsmovTs3fAg"></SpotifyButton>
        </View>
      )
    case 'bed_early':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc?si=8iorjzcTTsKE4onYFwci1g"></SpotifyButton>
        </View>
      )
    case 'wake_early':
      return (
        <View>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWWLToO3EeTtX?si=SL9W0RdVQjS8NnIzr6CuvQ"></SpotifyButton>
          <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWT3gM3xdPT0c?si=ySWdXV5xR4CV-ffG3KQZ7w"></SpotifyButton>
        </View>
      )
    default:
      return <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>
  }
}

const styles = StyleSheet.create({
  noSuggestion: {
    color: 'white',
    alignSelf: "center"
  }
})