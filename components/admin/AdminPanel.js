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
      let data = [];
      // Run the simulation X number of times
      for (let i = 0; i < x; i++) {
        for (const key in questions) {
          let responses = questions[key].responses;
          if (!responses) {
            data[key] = {};
            continue;
          }
          let y = Math.floor(Math.random() * responses.length);
          // If the question is a radio type (choose one)
          if (['scale', 'radio'].includes(questions[key].type)) {
            data[key] = responses[y].effects;
          }
          // If the question is a checkbox type (choose many)
          else if (questions[key].type == 'checkbox') {
            let responseEffects = responses.map((r) => r.effects);
            let randomItems = getRandomItems(responseEffects, y);
            let summedEffects = {}
            // For each randomly selected item
            for (const itemKey in randomItems) {
              for (const flagKey in randomItems[itemKey]) {
                // When flags compound within the same question
                if (Object.keys(summedEffects).includes(flagKey)) {
                  summedEffects[flagKey] = parseFloat(summedEffects[flagKey]) + parseFloat(randomItems[itemKey][flagKey]);
                // Otherwise, add normally, depending on type
                } else if (typeof randomItems[itemKey][flagKey] == 'boolean') {
                  summedEffects[flagKey] = randomItems[itemKey][flagKey];
                } else {
                  summedEffects[flagKey] = parseFloat(randomItems[itemKey][flagKey]);
                }
              }
            }
            data[key] = summedEffects;
          }
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
        return `${[e[0]]}:\n  1: ${parseInt(e[1].tally1).toString().padStart(4, ' ')} ${'-'.repeat(parseInt((e[1].tally1 / x) * 100))}\n  2: ${parseInt(e[1].tally2).toString().padStart(4, ' ')} ${'-'.repeat(parseInt((e[1].tally2 / x) * 100))}\n  3: ${parseInt(e[1].tally3).toString().padStart(4, ' ')} ${'-'.repeat(parseInt((e[1].tally3 / x) * 100))}`
      }).join('\n'));
    }
    else if (test == 'profileSurvey') {
      setOutput('This test is not implemented yet');
    }
    else {
      setOutput('[ERROR] Something went wrong with the picker, ask Tanner');
    }
  }

  function getRandomItems(arr, n) {
    // Copied from the interwebs, a function that randomly returns a given number of array items
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    if (n > len) throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
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
    overflow: 'scroll',
    fontFamily: 'space-mono'
  }
});
