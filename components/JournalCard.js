import React, { Component } from 'react';

import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';

export default function JournalCard(props) {
    let titleText = "1st October 2020";
    let bodyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    if (props.entry) {
        titleText = props.entry
    } else {

    }
    return (
        <View style={styles.container}>
            {/* <ImageBackground style={ styles.imgBackground }  
                    source={require('../assets/images/shapeDesign1.png')}>
            </ImageBackground> */}

            <Text style={styles.header}>1st October 2020</Text>
            <Text style={styles.bodyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>


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
