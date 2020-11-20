import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpotifyButton from '../Spotify/SpotifyButton';
export default class SuggestionSwitcher extends React.Component {
  constructor(props) {
    super(props);

  }

  /*
    TODO
    [ ]Change from description to id of suggestion (001, 002 etc)
    [ ] Make buttons integrated and open in Spotify App (big big undetaking)
    [ ] Add in other suggestion things
  */
  render() {
    let suggestionComponent;
    console.log(this.props.suggestionId);
    if (this.props.suggestionId) {
      switch (this.props.suggestionId.description) {
        case "Suggest a playlist for walking":
          suggestionComponent =
            <View>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWUxMV4K56wKL?si=OvfZ65J_QSGlNd11tc8Iuw"></SpotifyButton>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0?si=xGAZsK7HQsWrkEuNeqWS6g"></SpotifyButton>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX1bomZH0Sueq?si=o_gChwdtRSmg0Rzjc8-Xzg"></SpotifyButton>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX9B1hu73DioC?si=3i6KmA--RBi9aVggiR0z3Q"></SpotifyButton>
            </View>;
          break;
        case "Point them towards our journal feature. Ask them to write about the problem, ways to fix it, or positive things in their life.":
          suggestionComponent =
            <View>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=g0YSuUjmSym75B5t9V2P7w"></SpotifyButton>
              <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX9RwfGbeGQwP?si=oXnJvrCXS9y3_Mfy2TeCIw"></SpotifyButton>
            </View>;
          break;
        case "Suggest a calm book or a relaxing place to read":
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case "Find them resources to practice Yoga":
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DXdVyc8LtLi96?si=pxtgwChvT-27RGlI7KeYjA"></SpotifyButton>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u?si=hUmgBfU3QyqM6aMzJq06oA"></SpotifyButton>
          </View>;
          break;
        case "Suggest calming playlist":
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY?si=tBknCWE6QKSdcPTUtCI-6g"></SpotifyButton>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWT7XSlwvR1ar?si=2LJ6Y_dQRteIn3FKtJmYtw"></SpotifyButton>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1EFhBNP4nlD4eL?si=hQiLK8_sToeh_of9bFXdZA"></SpotifyButton>
          </View>;
          break;
        case 'Suggest watching a Youtube video':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case 'Give them tips to declutter':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case "https://www.healthline.com/health/breathing-exercises-for-anxiety":
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case "Provide healthy nap strategies":
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case "Give them small changes in their diet":
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestions</Text>;
          break;
        case 'Help them identify relaxing places to go to':
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6?si=tNfeNoghQXiOSXZh72bEZg"></SpotifyButton>
          </View>;
          break;
        case 'Provide exercise resources':
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP?si=DsxCYzfrROWnEqS2y3zrUQ"></SpotifyButton>
          </View>;
          break;
        case 'Provide facts':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestion</Text>;
          break;
        case 'Give them healthy sleep tips':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestion</Text>;
          break;
        case 'Provide facts - Fresh Air':
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWUxMV4K56wKL?si=c_4e_4dFQSSjsmovTs3fAg"></SpotifyButton>
          </View>;
          break;
        case 'Give them healthy sleep tips':
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc?si=8iorjzcTTsKE4onYFwci1g"></SpotifyButton>
          </View>;
          break;
        case 'Provide facts - Wake Up':
          suggestionComponent = 
          <View>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWWLToO3EeTtX?si=SL9W0RdVQjS8NnIzr6CuvQ"></SpotifyButton>
            <SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DWT3gM3xdPT0c?si=ySWdXV5xR4CV-ffG3KQZ7w"></SpotifyButton>
          </View>;
          break;
        case 'Provide Facts - Socialize':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestion</Text>;
          break;
        case 'Give advice - Goals':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestion</Text>;
          break;
        case 'Give advice - Productivity':
          suggestionComponent = <Text style={styles.noSuggestion}>No Spotify Suggestion</Text>;
          break;
      }
    }
    else {
      suggestionComponent = <Text style={styles.noSuggestion}>No Suggestion Availible</Text>
    }
    return (
      <View>
        {suggestionComponent}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noSuggestion: {
    color: 'white',
    alignSelf: "center"
  }
})