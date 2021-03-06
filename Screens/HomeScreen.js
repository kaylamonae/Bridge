import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, Image } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import TabSelectorAnimation from 'react-native-tab-selector';
import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, where, getDocs } from "firebase/firestore";
import { Divider } from 'react-native';
import { POSTS } from "./Post.js";
import { getStorage, ref } from "firebase/storage";
import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

const storage = getStorage();
const TABS = [{title: 'Latest'}, {title: 'Endorsed'}];
export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });
    // let POSTS = [];
    // async function getData(){
    //     const querySnapshot = await getDocs(collection(db, "posts"));
    //     querySnapshot.forEach((doc) => {
    //       user = doc.user
    //       profile = doc.profile
    //       picture = doc.picture

    //     });

    // }
    



    const [indexTab, setIndexTab] = useState(0);
    const [color, setColor] = useState('white');
    const renderItem = ({ item,  }) => {
        if(indexTab == 0){
            if(item.isEndorsed == true){
                    return (
                        <View style={styles.post}>
                        <View style={styles.postHeader}>
                            <Image source={item.profile} style={styles.postProfile}/>
                            <Text style={styles.user}>{item.user}</Text>
                            <Text style={styles.separate}>∙</Text>
                            <Text style={styles.time}>{item.timestamp}</Text>
                            <Ionicons style={styles.ribbon} name="md-ribbon" size={35} color={Colors.endorse}/>
                        </View>
                        <Image
                          source={item.picture }
                          style={styles.postImage}
                        />
                        <Text style={styles.postDescription}>
                            {item.description}
                        </Text>
                        <View style={styles.endorsedFooter}>
                                <Pressable onPress={setColor()}> 
                                    <Ionicons name="md-heart" size={35} color={color}/>
                                </Pressable>
                                    <Text style={styles.foot}>{item.likes}</Text>
                                    <Pressable style={styles.pressable}onPress={() => navigation.navigate('comments')}>
                                        < Ionicons name="md-chatbubble-ellipses" size={35} color="white"/>
                                        <Text style={styles.foot}>{item.comments}</Text>
                                    </Pressable>
                                    < Ionicons name="md-location-sharp" size={35} color="white"/>
                                    <Text style={styles.foot}>{item.location}</Text>
                                    </View>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.post}>
                        <View style={styles.postHeader}>
                            <Image source={item.profile} style={styles.postProfile}/>
                            <Text style={styles.user}>{item.user}</Text>
                            <Text style={styles.separate}>∙</Text>
                            <Text style={styles.time}>{item.timestamp}</Text>
                        </View>
                        <Image
                          source={item.picture }
                          style={styles.postImage}
                        />
                        <Text style={styles.postDescription}>
                            {item.description}
                        </Text>
                        <View style={styles.footer}>
                                <Pressable onPress={setColor(Colors.accent)}> 
                                    <Ionicons name="md-heart" size={35} color={color}/>
                                </Pressable>
                                    <Text style={styles.foot}>{item.likes}</Text>
                                    <Pressable style={styles.pressable}onPress={() => navigation.navigate('comments')}>
                                        < Ionicons name="md-chatbubble-ellipses" size={35} color="white"/>
                                        <Text style={styles.foot}>{item.comments}</Text>
                                    </Pressable>
                                    < Ionicons name="md-location-sharp" size={35} color="white"/>
                                    <Text style={styles.foot}>{item.location}</Text>
                                    </View>
                        </View>

                    )
                } 
        } else {
            if(item.isEndorsed == true){
                    return (
                        <View style={styles.post}>
                        <View style={styles.postHeader}>
                            <Image source={item.profile} style={styles.postProfile}/>
                            <Text style={styles.user}>{item.user}</Text>
                            <Text style={styles.separate}>∙</Text>
                            <Text style={styles.time}>{item.timestamp}</Text>
                            <Ionicons style={styles.ribbon} name="md-ribbon" size={35} color={Colors.endorse}/>
                        </View>
                        <Image
                          source={item.picture }
                          style={styles.postImage}
                        />
                        <Text style={styles.postDescription}>
                            {item.description}
                        </Text>
                        <View style={styles.endorsedFooter}>
                                    <Ionicons name="md-heart" size={35} color="white"/>
                                    <Text style={styles.foot}>{item.likes}</Text>
                                    <Pressable style={styles.pressable}onPress={() => navigation.navigate('comments')}>
                                        < Ionicons name="md-chatbubble-ellipses" size={35} color="white"/>
                                        <Text style={styles.foot}>{item.comments}</Text>
                                    </Pressable>
                                    < Ionicons name="md-location-sharp" size={35} color="white"/>
                                    <Text style={styles.foot}>{item.location}</Text>
                                    </View>
                        </View>
                    )
                }
        }
    }
      


    if (!fontsLoaded) {
        return <AppLoading/>
    } else {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>bridge</Text>
                        <Pressable onPress={()=> navigation.navigate('Profile')} style={styles.button}>
                            <Ionicons name="person" size={20} color="white"/>
                            <Text style={styles.profile}>Profile</Text>
                        </Pressable>
                    </View>
                    <TabSelectorAnimation
                        onChangeTab={setIndexTab}
                        style={styles.tabSelector}
                        tabs={TABS}
                        backgroundColor='white'
                        styleTitle={styles.tabText}
                    />
                </View>       
                <FlatList
                    style={styles.flatlist}
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={item => POSTS.item}
                    onPress={() => navigation.navigate('Comments')}
                />
             

                    
            </View>
        );
    }
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
        flex: 1,
        width: '93%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 15,
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
        backgroundColor: Colors.endorse,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 5, 
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },

    ribbon: {
        justifyContent: 'center',
        marginLeft: 10,
    },

    pressable:{
      flexDirection: 'row',
      alignItems: 'center',
    }
});

