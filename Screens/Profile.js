import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import { useState } from "react";
import { POSTS } from './Post.js';

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
    const renderItem = ({ item }) => {
        if(item.user == 'Caleb Robinson'){
            if(item.isEndorsed == true){
                    return (
                        <View style={styles.post}>
                        <View style={styles.postHeader}>
                            <Image source={item.profile} style={styles.postProfile}/>
                            <Text style={styles.user}>{item.user}</Text>
                            <Text style={styles.separate}>∙</Text>
                            <Text style={styles.time}>{item.timestamp}</Text>
                            <Ionicons style={styles.ribbon} name="ribbon-outline" size={35} color="#191970"/>
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
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Profile</Text>
                        <Text style={styles.name}>Hello, Caleb</Text>
                    </View>
                    <Image style={styles.image} source={{uri: "file:///var/mobile/Containers/Data/Application/2F380BFD-E7E6-48F1-924B-986F10B6AD34/Library/Caches/ExponentExperienceData/%2540anonymous%252FBridge-51e784ab-d3c9-4efa-b94b-5d8458651ec9/ImagePicker/7AB112B6-422C-4AEF-9B73-15B4018D0582.png"}}/>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Your Posts:</Text>
                    <FlatList
                    style={styles.flatlist}
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={item => POSTS.item}
                    onPress={() => navigation.navigate('Comments')}
                />
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
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 8},
        shadowColor: 'grey',
        marginBottom: 0
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
        backgroundColor: '#4682B4',
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
      alignItems: 'center',
    }

});