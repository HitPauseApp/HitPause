import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import h from '../../globals';
import { AuthContext } from '../../AuthContext.js';
import { AppContext } from '../../AppContext.js';

export default function AccountTraits(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [userTraits, setUserTraits] = React.useState([]);

  // Firebase calls to make on component load
  React.useEffect(() => {
    user.ref.child('profile/traits').on('value', (s) => {
      if (s.exists()) setUserTraits(Object.keys(s.val()));
      else setUserTraits([]);
    });    
  }, []);

  function renderTrait(t, i) {
    let trait = hitpause.traits[t];
    console.log('trait -->', trait);
    if (trait) return (
      <Text key={i}>{trait.name}</Text>
    )
    else return null;
  }

  return (
    <View>
      <View>
        <Text>User Traits</Text>
      </View>
      <ScrollView>
        {
          userTraits.map(renderTrait)
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

});