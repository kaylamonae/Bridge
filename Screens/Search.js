import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image, Stack } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import TabSelectorAnimation from 'react-native-tab-selector';
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

import posts from "./HomeScreen.js" 
import { POSTS } from "./Post.js";

const TABS = [{title: 'Local'}, {title: 'Other Communities'}];

export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });
    // const Home = () => {
        const [searchPhrase, setSearchPhrase] = useState("");
        const [clicked, setClicked] = useState(false);
        const [fakeData, setFakeData] = useState();
    // }
    const DATA = [POSTS];
    const [indexTab, setIndexTab] = useState(0);
    const [text, onChangeText] = useState("");
    const [states, setStates] = useState(DATA)
    //const postsRef = collection(db, "posts");
    //const q = query(postsRef, where("location", "==", "text"));

    const renderItem = ({ item }) => (
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
    );


    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>search</Text>
                    </View>
                    <TabSelectorAnimation
                        onChangeTab={setIndexTab}
                        style={styles.tabSelector}
                        tabs={TABS}
                        backgroundColor='white'
                        styleTitle={styles.tabText}
                        styleTab={styles.tab}
                    />
                    <TextInput 
                        style={styles.bar}
                        placeholder= "Search"
                        />
                    <FlatList
                    style={styles.flatlist}
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={item => POSTS.item}
                />

                </View>
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
        fontSize: 35,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    bar: {
        height: 40,
        width: 250,
        marginTop: 45,
        marginRight: 20,
        borderWidth: 3,
        padding: 10,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_400Regular'
    },

    tabSelector: {
        marginHorizontal: 8,
    },

    tabText: {
        fontFamily: 'Outfit_700Bold',
        color: Colors.dark_green,
        fontSize: 18
    }, 

    tab: {
        overlayColor: Colors.dark_green
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
        marginRight: 20
    },

    separate: {
        color: Colors.dark_green,
        fontSize: 25,
        marginRight: 5
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
        fontFamily: 'Outfit_300Light',
        fontSize: 20,
        color: 'white',
        marginLeft: 8,
        marginRight: 8
    },

    flatlist: {
        flex: 0.82,
    },
});
