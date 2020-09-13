import {MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';

export default function MatIcons(props){
    return(
        <MaterialIcons
            name={props.name}
            size={30}
            style={{ marginBottom: -3 }}
            color={props.color || "white"}
        />
    );
}