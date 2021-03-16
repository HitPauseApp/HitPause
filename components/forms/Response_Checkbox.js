import * as React from 'react';
import h from '../../globals';
import { Text, View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

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
      if (newValue.includes(key)) {
        let effects = props.responses[key].effects;
        for (const flagKey in effects) {
          // When flags compound within the same question
          if (Object.keys(flags).includes(flagKey)) {
            flags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(effects[flagKey]);
          // Otherwise, add normally, depending on type
          } else if (typeof effects[flagKey] == 'boolean') {
            flags[flagKey] = effects[flagKey];
          } else {
            flags[flagKey] = parseFloat(effects[flagKey]);
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
            labelStyle={{color: h.colors.primary}}
            style={styles.checkBox}
            color={h.colors.primary}
            key={String(key)}
            status={Array.isArray(props.value) && props.value.indexOf(String(key)) >= 0 ? 'checked' : 'unchecked'}
            onPress={() => onChange(String(key))}
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
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    borderRadius: RFValue(15),
    alignSelf: 'center',
    width: '80%'
  }
});