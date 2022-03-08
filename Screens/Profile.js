import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import TabSelectorAnimation from 'react-native-tab-selector';
import { useState } from "react";

import {
    useFonts, 
    Outfit_300Light,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'
import { NavigationContainer } from '@react-navigation/native';

export default function Profile ({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_300Light,
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Profile</Text>
                        <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
                            <Text style={styles.home}>Home</Text>
                        </Pressable>
                    </View>
                    <Image style={styles.image} source={require('../assets/blank-profile.webp')}/>
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
        flex: 0.2,
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
        marginBottom: 20
    },

    content: {
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 25
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});