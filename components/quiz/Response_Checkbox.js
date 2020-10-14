import * as React from 'react';
import { Text, View, StyleSheet, ImagePropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Response_Checkbox(props) {
  const onChange = (score) => {
    let oldValue = Array.isArray(props.value) ? [...props.value] : [];
    let newValue = [];
    let flags = {};
    // Handle "uncheck" case
    if (oldValue.length > 0 && oldValue.indexOf(score) >= 0) {
      oldValue.splice(oldValue.indexOf(score), 1);
      newValue = oldValue.splice(0);
    // Handle "check" case
    } else {
      newValue = [...oldValue, score];
    }
    // Get flag changes
    for (const key in props.responses) {
      if (newValue.includes(props.responses[key].score)) {
        for (const flagKey in props.responses[key].flagChanges) {
          // When flags compound within the same question
          if (Object.keys(flags).includes(flagKey)) {
            flags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(props.responses[key].flagChanges[flagKey]);
          // Otherwise, add normally
          } else {
            flags[flagKey] = parseFloat(props.responses[key].flagChanges[flagKey]);
          }
        }
      }
    }
    props.onChange(newValue, flags);
  }

  return (
    <View style={styles.quizQuestion}>
      {
        Object.values(props.responses).map((item, key) =>
          <View style={styles.checkItem} key={key}>
            <Text style={styles.checkText}>{item.text}</Text>
            <Checkbox
              key={key}
              status={Array.isArray(props.value) && props.value.indexOf(item.score) >= 0 ? 'checked' : 'unchecked'}
              onPress={() => onChange(item.score)}
            />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#48484A",
    textAlign: "center"
  },
  checkItem: {
    flexDirection: "row",
    alignSelf: "center"
  },
  checkText: {
    marginTop: 10,
  }
});