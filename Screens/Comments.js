import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, Image, TextInput} from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import TabSelectorAnimation from 'react-native-tab-selector';
import { useState } from "react";
import { db } from "../firebase";
//import { doc, getDoc } from "firebase/firestore";
import { Divider } from 'react-native';
import { POSTS } from "./Post.js";
//import { Avatar, withStyles, List } from 'react-native-ui-kitten';
//import { ApplicationProvider, Layout,  } from '@ui-kitten/components';

import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

const TABS = [{title: 'Latest'}, {title: 'Endorsed'}];
//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");

export default function Comments({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Replies</Text>
      </View>
      <View style={styles.post}>
            <View style={styles.postHeader}>
                <Image source={POSTS[0].profile} style={styles.postProfile}/>
                <Text style={styles.user}>{POSTS[0].user}</Text>
                <Text style={styles.separate}>∙</Text>
                <Text style={styles.time}>{POSTS[0].timestamp}</Text>
            </View>
            <Image
              source={POSTS[0].picture }
              style={styles.postImage}
            />
            <Text style={styles.postDescription}>
                {POSTS[0].description}
            </Text>
            <View style={styles.endorsedFooter}>
                        <Ionicons name="md-heart" size={35} color="white"/>
                        <Text style={styles.foot}>{POSTS[0].likes}</Text>
                            < Ionicons name="md-chatbubble-ellipses" size={35} color="white"/>
                            <Text style={styles.foot}>{POSTS[0].comments}</Text>
                        < Ionicons name="md-location-sharp" size={35} color="white"/>
                        <Text style={styles.foot}>{POSTS[0].location}</Text>
                        </View>
        </View>
        <View style={styles.comment}>
          <Image style={styles.prof}
          source={require('../assets/addedAssets/profiles/samuelJames.jpg')} />
          <Text style={styles.commentText}>Yes! I ran over it this morning and {'\n'} spilled my coffee.</Text>
        </View>
        <View style={styles.comment}>
          <Image style={styles.prof}
          source={require('../assets/addedAssets/profiles/patriciaHumphrey.jpg')} />
          <Text style={styles.commentText}>It has become a real issue!  The roads feel{'\n'} unsafe to traverse.</Text>
        </View>
        <View style={styles.comment}>
          <Image style={styles.prof}
          source={require('../assets/addedAssets/profiles/matthewLiu.jpg')} />
          <Text style={styles.commentText}>It has become a real issue!  The roads feel{'\n'} unsafe to traverse.</Text>
        </View>
        <TextInput style={styles.reply} placeholder="Post a Reply"
        />

        
    </View>
    


  )



}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background,
    },

    header: {
        flex: 0.22,
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
        flex: 0.45,
        width: '93%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 40,
    },

    postImage: {
        width: '90%',
        height: 150,
        borderRadius: 9,
        alignSelf: 'center'
    },

    postHeader: {
        height: '22%',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    postDescription: {
        padding: 5,
        fontFamily: 'Outfit_400Regular',
        fontSize: 18,
        color: 'black',
        alignSelf: 'center'
    },

    postProfile: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },  

    user: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: Colors.dark_green,
        marginRight: 5
    },

    separate: {
        color: Colors.dark_green,
        fontSize: 25,
        marginRight: 1
    },

    time: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: Colors.dark_green,
        marginLeft: 10
    },

    footer: {
        backgroundColor: Colors.dark_green,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 5, 
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },

    foot: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 20,
        color: 'white',
        marginLeft: 8,
        marginRight: 8
    },

    flatlist: {
        flex: 0.82,
    },

    endorsedFooter: {
        backgroundColor: Colors.dark_green,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 5, 
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },

    ribbon: {
        justifyContent: 'center',
    },

    pressable:{
      flexDirection: 'row',
    },

    commentHeader: {
        height: '22%',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },

    commentText: {
        padding: 5,
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: 'black',
        alignSelf: 'center'
    },

    comment: {
        backgroundColor: 'white',
        flex: 0.1, 
        marginTop: 20,
        borderRadius: 30,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    prof: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },

    header: {
        flex: 0.18,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 8},
        shadowColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    reply: {
        height: 40,
        width: 120,
        marginTop: 20,
        marginLeft: 10,
        borderWidth: 3,
        padding: 10,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_400Regular',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
    },


});