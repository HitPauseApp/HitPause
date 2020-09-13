import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import MatIcons from '../components/MatIcons';
import FillButton from '../components/buttons/FillButton';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import user from '../assets/images/user.png';


export default function Account(props){
    const exUser = {
        uname: "Username",
        phone: "123-456-7890",
        email: "reallylonguser@hitpause.com",
        connected: false,
    }
    return(
        <View style={styles.container}>
            <Image source={user} style={styles.avatar}></Image>
            <View style={styles.category}>
                <MatIcons name="person"></MatIcons>
                <Text style={styles.text}>{exUser.uname}</Text>
            </View>
            
            <View style={styles.separator}></View>
            
            <View style={styles.category}>
                <MatIcons name="phone-iphone"></MatIcons>
                <Text style={styles.text}>{exUser.phone}</Text>
            </View>
            
            <View style={styles.separator}></View>

            <View style={styles.category}>
                <MatIcons name="email"></MatIcons>
                <Text style={styles.text}>{exUser.email}</Text>
            </View>
            
            <View style={styles.separator}></View>

            <View style={styles.category}>
                <FontAwesome name="spotify" size={30} color="white" />
                <Text style={styles.text}>{exUser.connected ? 'Connected' : 'Not Connected'}</Text>
            </View>
            
            <View style={styles.separator}></View>

            <View style={styles.category}>
                <MaterialCommunityIcons name="textbox-password" size={30} color="white" />
                <Text style={styles.text}>*******</Text>
            </View>
            <FillButton text="EDIT DETAILS"></FillButton>
            <Text style={styles.signOut}>Sign Out</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#6E00DD'
    },
    text:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 30
    },
    separator:{
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        width: '80%',
        alignSelf: 'center',
        margin: 20.5
    },
    category:{
        flexDirection: "row",
        marginLeft: 40
    },
    avatar: {
        width: 100, 
        height: 100,
        alignSelf: 'center',
        margin: 20
    },
    signOut: {
        color: 'white',
        alignSelf: 'center',
    }

});