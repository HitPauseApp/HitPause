import React, { Component } from 'react';
import firebase from '../Firebase';

import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';

export default function JournalCard(props) {
    const [title, setTitle] = React.useState("1st October 2020");
    const [body, setBody] = React.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
    if (props.useFire) {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/journal`).once('value').then(s => {
            let entries = Object.values(s.val());
            setTitle(entries[0].title);
            setBody(entries[0].text);
        })
    }
    return (
        <View style={styles.container}>
            {/* <ImageBackground style={ styles.imgBackground }  
                    source={require('../assets/images/shapeDesign1.png')}>
            </ImageBackground> */}

            <Text style={styles.header}>{title}</Text>
            <Text style={styles.bodyText}>{body}</Text>


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
        positions: 'absolute'
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
