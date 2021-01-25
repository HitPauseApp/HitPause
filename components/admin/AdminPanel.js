import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Picker } from 'react-native';
import { AppContext } from '../../AppContext';
import firebase from '../../Firebase';
import h from '../../globals';

export default function AdminPanel(props) {
  const [test, setTest] = React.useState('incident');
  const hitpause = React.useContext(AppContext);

  async function runSelectedTest() {
    let x = 10000;
    if (test == 'incident') {
      // Get questions from firebase
      let s = await firebase.database().ref('hitpause/quizzes/incidentQuestionnaire/questions').once('value');
      let questions = s.val();
      let totals = JSON.parse(JSON.stringify(hitpause.suggestions));
      // Run the simulation X number of times
      for (let i = 0; i < x; i++) {
        let data = [];
        for (const key in questions) {
          let responses = questions[key].responses;
          if (!responses) {
            data[key] = {};
            continue;
          }
          let y = Math.floor(Math.random() * responses.length);
          data[key] = responses[y].effects;
        }
        let outputFlags = h.tallyOutputFlags(data);
        let topThree = h.getHighsAndLows(outputFlags, 3, 0)[0];
        let suggestions = h.randomizeSuggestions(topThree);
        totals[suggestions[0]].tally1 = (totals[suggestions[0]].tally1 || 0) + 1;
        totals[suggestions[1]].tally2 = (totals[suggestions[1]].tally2 || 0) + 1;
        totals[suggestions[2]].tally3 = (totals[suggestions[2]].tally3 || 0) + 1;
      }
      // For each result, tally the first, second, and third suggestions
      console.log(Object.entries(totals).map(e => {
        return { [e[0]]: `1: ${e[1].tally1}, 2: ${e[1].tally2}, 3: ${e[1].tally3}` }
      }));
    }
    else if (test == 'initial') {
      console.log('yeet');
    }
    else {
      console.log('yadda');
    }
  }

  return (
    <View>
      <Picker
        selectedValue={test}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setTest(itemValue)}
      >
        <Picker.Item label="Incident Algorithm" value="incident" />
        <Picker.Item label="Initial Algorithm" value="initial" />
      </Picker>
      <TouchableOpacity
        onPress={() => runSelectedTest()}
      >
        <Text>Run Test</Text>
      </TouchableOpacity>
    </View>
  )
}