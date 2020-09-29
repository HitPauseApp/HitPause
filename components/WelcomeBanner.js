import React, {Component} from 'react';

import { StyleSheet, View, Text} from 'react-native';
import firebase from '../Firebase.js';
import user from '../assets/images/user.png';

export default class WelcomeBanner extends Component{
    constructor(props) {
        super(props);
        this.state = {user: {}, uid: firebase.auth().currentUser.uid};
    }
    componentDidMount() {
        this.getUserData(this.state.uid);
        console.log('this.state:', this.state);
    }
    getUserData(uid) {
        firebase.database().ref(`users/${uid}`).once('value').then((snapshot) => {
          this.setState({user: snapshot.val()});
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome Back,</Text>
                <Text style={styles.header}>{this.state.user.firstName}!</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        paddingLeft: 10,
        position: 'absolute',
        bottom:10,
        overflow: 'hidden'
    },
    text:{
        fontFamily: 'Poppins-Thin',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header:{
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        
    },
    
});
