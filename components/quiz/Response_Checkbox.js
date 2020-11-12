import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function Response_Checkbox(props) {
  const onChange = (id) => {
    let oldValue = Array.isArray(props.value) ? [...props.value] : [];
    let newValue = [];
    let flags = {};
    // Handle "uncheck" case
    if (oldValue.length > 0 && oldValue.indexOf(id) >= 0) {
      oldValue.splice(oldValue.indexOf(id), 1);
      newValue = oldValue.splice(0);
      // Handle "check" case
    } else {
      newValue = [...oldValue, id];
    }
    // Get flag changes
    for (const key in props.responses) {
      if (newValue.includes(props.responses[key].id)) {
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
    <View>
      {
        Object.values(props.responses).map((item, key) =>
          <Checkbox.Item
            label={item.text}
            // TODO: This is not working at the moment... look for an update eventually
            labelStyle={{color: '#00095e'}}
            style={styles.checkBox}
            color="#00095e"
            key={key}
            status={Array.isArray(props.value) && props.value.indexOf(item.id) >= 0 ? 'checked' : 'unchecked'}
            onPress={() => onChange(item.id)}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%'
  }
});