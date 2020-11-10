import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function AppIcons(props) {
  let icon = props.name.split(':');
  if (icon[0] == 'materialicons') {
    return (
      <MaterialIcons
        name={icon[1]}
        size={props.size || 30}
        // style={{ marginBottom: -3 }}
        color={props.color || "white"}
      />
    );
  } else if (icon[0] == 'materialcommunityicons') {
    return (
      <MaterialCommunityIcons
        name={icon[1]}
        size={props.size || 30}
        color={props.color || "white"}
      />
    );
  } else if (icon[0] == 'fontawesome5') {
    return (
      <FontAwesome5
        name={icon[1]}
        size={props.size || 30}
        color={props.color || "white"}
      />
    );
  } else if (icon[0] == 'ionicons') {
    return (
      <Ionicons
        name={icon[1]}
        size={props.size || 30}
        color={props.color || "white"}
      />
    );
  } else {
    console.error('Attempted to use unspecified icon type:', icon[0]);
  }
}