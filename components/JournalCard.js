import React, { Component } from 'react';
import firebase from '../Firebase';

import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';

export default function JournalCard(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{props.entry.title}</Text>
            <Text style={styles.bodyText}>{props.entry.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132090',
        //justifyContent: 'center',
        //alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        //padding: 10,
        bottom: 1,
        margin: 10,
        height: 150,
        //position: 'absolute'
    },
    header: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        //textAlign: 'left',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    imgBackground: {
        width: '50%',
        height: '50%',
        alignSelf: 'left',
        position: 'absolute',
        top: 20
    },
    bodyText: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'left',
        paddingHorizontal: 20,
    }
});
