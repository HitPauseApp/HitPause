import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Picker } from 'react-native';
import { AppContext } from '../../AppContext';
import firebase from '../../Firebase';
import h from '../../globals';

export default function AdminPanel(props) {
  const [test, setTest] = React.useState('incident');
  const [output, setOutput] = React.useState('');
  const hitpause = React.useContext(AppContext);

  async function runSelectedTest() {
    let x = 10000;
    if (test == 'pauseSurvey') {
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
      setOutput(Object.entries(totals).map(e => {
        return `${[e[0]]}:\n  1: ${e[1].tally1}\n  2: ${e[1].tally2}\n  3: ${e[1].tally3}\n`
      }).join('\n'));
    }
    else if (test == 'profileSurvey') {
      setOutput('yeet');
    }
    else {
      console.log('yadda');
    }
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={test}
        style={{ width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setTest(itemValue)}
      >
        <Picker.Item label="Pause Survey" value="pauseSurvey" />
        <Picker.Item label="Profile Survey" value="profileSurvey" />
      </Picker>
      <TouchableOpacity style={styles.button}
        onPress={() => runSelectedTest()}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Run Test</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        <Text style={styles.outBox}>{output}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    display: 'flex'
  },
  button: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: h.colors.primary,
    marginTop: 20
  },
  outBox: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 5,
    overflow: 'scroll'
  }
});
