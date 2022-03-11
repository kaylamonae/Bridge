import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import { useState } from "react";

import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
} from '@expo-google-fonts/outfit'

let username = "";
const auth = getAuth();
let photo = '../assets/blank-profile.webp';

onAuthStateChanged(auth, (user) => {
    if (user) {
        username = user.displayName;
        if (user.photoURL !== "") {
            console.log(user.photoURL)
            photo = user.photoURL;
        }
    } 
});

export default function Profile ({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Profile</Text>
                        <Text style={styles.name}>Hello {username}</Text>
                    </View>
                    <Image style={styles.image} source={{uri: photo}}/>
                </View>
                <View style={styles.content}>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background
    },

    header: {
        flex: 0.22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 8},
        shadowColor: 'grey',
        marginBottom: 10
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
    },

    content: {
        flex: 1,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 25,
        marginBottom: 10
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 25,
        margin: 20,
        marginTop: 40,
        alignSelf: 'center'
    },

    button: {
        flex: .45,
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: Colors.dark_green,
        width: '20%', 
        height: 40,
        marginTop: 40,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    home: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        marginLeft: 5
    },

    headerLeft: {
        backgroundColor: 'white',
        borderRadius: 30
    },

    name: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_400Regular',
        fontSize: 28,
        marginLeft: 20,
        marginTop: 10
    }
});