import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import TabSelectorAnimation from 'react-native-tab-selector';
import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Divider } from 'react-native';
import { POSTS } from "./Post.js";
//import { Avatar, withStyles, List } from 'react-native-ui-kitten';
//import { ApplicationProvider, Layout,  } from '@ui-kitten/components';

import {
    useFonts, 
    Outfit_300Light,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

const TABS = [{title: 'Latest'}, {title: 'Endorsed'}];
//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");

export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_300Light,
    });

    const [indexTab, setIndexTab] = useState(0);
    const renderItem = ({ item }) => (
      <View style={styles.post}>
        <View style={styles.postHeader}>
            < Image
                source={item.profile}
                style={styles.postProfile}
            />
            <Text style={styles.user}>
                {item.user}
            </Text>
            < Text style={styles.time}>
                {item.timestamp}
            </Text>
            
        </View>
        <Image
          source={item.picture }
          style={styles.postImage}
        />

        <Text style={styles.postDescription}>
            {item.description}
        </Text>
        <View style={styles.footer}>
            < Ionicons name="ios-heart-outline" size={40} color="black"/>
            <Text style={styles.foot}>
                {item.likes}
            </Text>
            < Ionicons name="chatbox-ellipses" size={40} colors="white"/>
            <Text style={styles.foot}>
                {item.comments}
            </Text>
            < Ionicons name="pin" size={35} colors="black"/>
            <Text style={styles.foot}>
                {item.location}
            </Text>
        </View>
    
      </View>
    )

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>bridge</Text>
                        <Pressable style={styles.button}>
                            <Ionicons name="person" size={20} color="white"/>
                            <Text style={styles.profile}>Profile</Text>
                        </Pressable>
                        <TabSelectorAnimation
                        onChangeTab={setIndexTab}
                        style={styles.tabSelector}
                        tabs={TABS}
                        backgroundColor='white'
                        styleTitle={styles.tabText}
                        />
                    </View>
                </View>                    
                <FlatList
                    style={styles.flatlist}
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={item => POSTS.item}
                />
                    
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background,
    },

    header: {
        flex: 0.18,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 8},
        shadowColor: 'grey',
    },

    headerText: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
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

    profile: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        marginLeft: 5
    }, 

    tabSelector: {
        marginHorizontal: 8,
        marginBottom: 10,
    },

    tabText: {
        fontFamily: 'Outfit_700Bold',
        color: Colors.dark_green,
        fontSize: 18
    }, 

    scrollView: {
        backgroundColor: Colors.dark_green,
        marginTop: 20,
    },

    post: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 0.25,
        padding: 10,
        backgroundColor: 'white',
        marginTop: 40,
        shadowColor: 'black',
        shadowOpacity: 12

    },

    postImage: {
        width: '75%',
        height: 200,
        borderRadius: 9,
        alignSelf: 'center'
    },

    postHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    postTitle: {
        color: "#ffffff"
    },

    postDescription: {
        padding: 10,
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: '#161618',
        alignSelf: 'center',
        fontWeight: "100",

    },

    postProfile: {
        width: '25%',
        height: '100%',
        borderRadius: 10,
    }, 

    user: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: '#161618',
    },

    time: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 12,
        color: 'black',
    },

    footer: {
        flexDirection: 'row',
        padding: 5,
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },

    foot: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 18,
        color: 'black',
    },

    flatlist: {
        flex: 0.82,
    },


});

