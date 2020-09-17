import * as React from 'react';

import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default function FillButton(props){
    const text = props.text;
    const path = props.path;

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    buttonContainer:{
        alignSelf: 'center',
        margin: 10
    },
    button:{
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 8
    },
    text: {
        color: '#6E00DD',
        fontSize: 16,
        fontWeight: '600',   
    }
});