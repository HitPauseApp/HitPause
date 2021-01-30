import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function AppIcons(props) {
  let icon = props.name.split(':');
  switch (icon[0]) {
    case 'materialicons':
      return (
        <MaterialIcons
          name={icon[1]}
          size={props.size || 30}
          // style={{ marginBottom: -3 }}
          color={props.color || "white"}
        />
      );
    case 'materialcommunityicons':
      return (
        <MaterialCommunityIcons
          name={icon[1]}
          size={props.size || 30}
          color={props.color || "white"}
        />
      );
    case 'fontawesome5':
      return (
        <FontAwesome5
          name={icon[1]}
          size={props.size || 30}
          color={props.color || "white"}
        />
      );
    case 'fontawesome':
      return (
        <FontAwesome
          name={icon[1]}
          size={props.size || 30}
          color={props.color || "white"}
        />
      );
    case 'ionicons':
      return (
        <Ionicons
          name={icon[1]}
          size={props.size || 30}
          color={props.color || "white"}
        />
      );
    default:
      console.error('Attempted to use unspecified icon type:', icon[0]);
      return null;
  }
}
