import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SpotifyButton from '../Spotify/SpotifyButton';

export default function SuggestionSwitcher(props) {
  const playlistData = {
    eveningStroll: {
      title: "Evening Stroll",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003ebb681eef2efd16d489e0b10",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWUxMV4K56wKL?si=OvfZ65J_QSGlNd11tc8Iuw"
    },
    moodBoosters: {
      title: "Mood Boosters",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003aa93fe4e8c2d24fc62556cba",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0?si=xGAZsK7HQsWrkEuNeqWS6g"
    },
    morningWalkPiano: {
      title: "Morning Walk Piano",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000034c4ddebfddf9ed80975c430e",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX1bomZH0Sueq?si=o_gChwdtRSmg0Rzjc8-Xzg"
    },
    indieChillout: {
      title: "Indie Chillout",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003a20077cb15561277c30f6eb5",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX9B1hu73DioC?si=3i6KmA--RBi9aVggiR0z3Q"
    },
    lofiBeats: {
      title: "Lo-Fi Beats",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003c414e7daf34690c9f983f76e",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=g0YSuUjmSym75B5t9V2P7w"
    },
    lofiCafe: {
      title: "Lo-Fi Cafe",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000033f861d7f7b340e5e4934bb78",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX9RwfGbeGQwP?si=oXnJvrCXS9y3_Mfy2TeCIw"
    },
    sunriseYoga: {
      title: "Sunrise Yoga",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000036211a2015e7d51c6b37c79ea",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DXdVyc8LtLi96?si=pxtgwChvT-27RGlI7KeYjA"
    },
    peacefulMeditation: {
      title: "Peaceful Meditation",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f0000000312cf5fd4624cce89f748ec99",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u?si=hUmgBfU3QyqM6aMzJq06oA"
    },
    ambientRelaxation: {
      title: "Ambient Relaxation",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003fbcb321e14b5b643f21bf3aa",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY?si=tBknCWE6QKSdcPTUtCI-6g"
    },
    totallyStressFree: {
      title: "Totally Stress Free",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000031a9c145d6c6a8bbe4844e28c",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWT7XSlwvR1ar?si=2LJ6Y_dQRteIn3FKtJmYtw"
    },
    dailyWellness: {
      title: "Daily Wellness",
      author: "Spotify",
      image: "https://daily-mix.scdn.co/covers/gift_sets/YDD/daily-wellness-small.jpg",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1EFhBNP4nlD4eL?si=hQiLK8_sToeh_of9bFXdZA"
    },
    chillHits: {
      title: "Chill Hits",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003cf8e264c6a92e245402ecb7a",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6?si=tNfeNoghQXiOSXZh72bEZg"
    },
    beastMode: {
      title: "Beast Mode",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000039249b35f23fb596b6f006a15",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP?si=DsxCYzfrROWnEqS2y3zrUQ"
    },
    morningStroll: {
      title: "Morning Stroll",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000033914301cb57afa77aa531929",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWWLToO3EeTtX?si=SL9W0RdVQjS8NnIzr6CuvQ"
    },
    cozyAcousticMorning: {
      title: "Cozy Acoustic Morning",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f000000032c34572f4288b46920f820f4",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DWT3gM3xdPT0c?si=ySWdXV5xR4CV-ffG3KQZ7w"
    },
    rainSounds: {
      title: "Rain Sounds",
      author: "Spotify",
      image: "https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de",
      webLink: "https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc?si=8iorjzcTTsKE4onYFwci1g"
    }
  };
  switch (props.suggestionId || '') {
    case 'walk':
      return (
        <View>
          <SpotifyButton playlist={playlistData.eveningStroll}></SpotifyButton>
          <SpotifyButton playlist={playlistData.moodBoosters}></SpotifyButton>
          <SpotifyButton playlist={playlistData.morningWalkPiano}></SpotifyButton>
          <SpotifyButton playlist={playlistData.indieChillout}></SpotifyButton>
        </View>
      )
    case 'journal':
      return (
        <View>
          <SpotifyButton playlist={playlistData.lofiBeats}></SpotifyButton>
          <SpotifyButton playlist={playlistData.lofiCafe}></SpotifyButton>
        </View>
      )
    case 'meditate_yoga':
      return (
        <View>
          <SpotifyButton playlist={playlistData.sunriseYoga}></SpotifyButton>
          <SpotifyButton playlist={playlistData.peacefulMeditation}></SpotifyButton>
        </View>
      )
    case 'music':
      return (
        <View>
          <SpotifyButton playlist={playlistData.ambientRelaxation}></SpotifyButton>
          <SpotifyButton playlist={playlistData.totallyStressFree}></SpotifyButton>
          <SpotifyButton playlist={playlistData.dailyWellness}></SpotifyButton>
        </View>
      )
    case 'break':
      return (
        <View>
          <SpotifyButton playlist={playlistData.chillHits}></SpotifyButton>
          <SpotifyButton playlist={playlistData.dailyWellness}></SpotifyButton>
        </View>
      )
    case 'exercise':
      return (
        <View>
          <SpotifyButton playlist={playlistData.beastMode}></SpotifyButton>
        </View>
      )
    case 'fresh_air':
      return (
        <View>
          <SpotifyButton playlist={playlistData.eveningStroll}></SpotifyButton>
        </View>
      )
    case 'bed_early':
      return (
        <View>
          <SpotifyButton playlist={playlistData.rainSounds}></SpotifyButton>
        </View>
      )
    case 'wake_early':
      return (
        <View>
          <SpotifyButton playlist={playlistData.morningStroll}></SpotifyButton>
          <SpotifyButton playlist={playlistData.cozyAcousticMorning}></SpotifyButton>
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