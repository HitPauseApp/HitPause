import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Picker } from 'react-native';
import { AppContext } from '../../AppContext';
import firebase from '../../Firebase';

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
        let outputFlags = tallyOutputFlags(data);
        let topThree = getHighsAndLows(outputFlags, 3, 0)[0];
        let suggestions = randomizeSuggestions(topThree);
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

  function tallyOutputFlags(flags) {
    let outputFlags = {};
    let modifiers = [];
    // For each object in the array of flags
    for (const key in flags) {
      // For each property in the flag object
      for (const flagKey in flags[key]) {
        // If we are affecting the highest flags
        if (flagKey.includes('_highest_')) {
          let count = parseInt(flagKey.replace('_highest_', ''));
          modifiers.push({ type: 'high', count: count, amount: parseFloat(flags[key][flagKey]) });
        }
        // If we are affecting the lowest flags
        else if (flagKey.includes('_lowest_')) {
          let count = parseInt(flagKey.replace('_lowest_', ''));
          modifiers.push({ type: 'low', count: count, amount: parseFloat(flags[key][flagKey]) });
        }
        // If flags of this type already exist, sum them
        else if (Object.keys(flags).includes(flagKey)) {
          outputFlags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(flags[key][flagKey]);
        }
        // Otherwise, add normally
        else outputFlags[flagKey] = parseFloat(flags[key][flagKey]);
      }
    }

    // For all of our special cases
    for (const key in modifiers) {
      let modifiedFlags = {};
      // Depending on type of case, grab relevant flags
      if (modifiers[key].type == 'high') {
        modifiedFlags = getHighsAndLows(outputFlags, modifiers[key].count, 0)[0];
      } else if (modifiers[key].type == 'low') {
        modifiedFlags = getHighsAndLows(outputFlags, 0, modifiers[key].count)[1];
      }
      // Apply changes to those flags
      for (const flagKey in modifiedFlags) modifiedFlags[flagKey] = modifiedFlags[flagKey] + modifiers[key].amount;
      outputFlags = { ...outputFlags, ...modifiedFlags };
    }
    return outputFlags;
  }

  // TODO: Incomplete... will probably want to move this into summary screen
  // TODO: Ties are unfair, as lower keys will always be chosen... need a way to randomly select when there are ties
  function getHighsAndLows(flags, numHighs, numLows) {
    let highValues = [], lowValues = [];
    let sortedFlags = Object.entries(flags).sort((a, b) => (a[1] < b[1]));
    if (numHighs > 0) {
      highValues = sortedFlags.slice(0, numHighs);
    }
    if (numLows > 0) {
      lowValues = sortedFlags.slice(sortedFlags - 1 - numLows, sortedFlags.length - 1);
    }
    return [Object.fromEntries(highValues), Object.fromEntries(lowValues)];
  }

  function randomizeSuggestions(flags) {
    let n = 0;
    for (const key in flags) {
      let squaredDoubleFlag = (flags[key] * 2) ** 2;
      flags[key] = squaredDoubleFlag + n;
      n = squaredDoubleFlag + n;
    }
    let randomInt = Math.floor(Math.random() * n);
    for (const key in flags) {
      if (flags[key] > randomInt) {
        delete flags[key];
        // TODO: Verify this actually works correctly
        let remainingKeys = Object.keys(flags).length > 0 ? randomizeSuggestions(flags) : [];
        return [key, ...remainingKeys];
      };
    }
    return null;
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