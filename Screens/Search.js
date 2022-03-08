import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image, Stack } from 'react-native';
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

import posts from "./HomeScreen.js" 
import { POSTS } from "./Post.js";
const TABS = [{title: 'Local'}, {title: 'Other Communities'}];
const DATA = ['Palo Alto', 'Berkeley', 'Alameda', 'France'];

export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_300Light,
    });

    const [indexTab, setIndexTab] = useState(0);
    const [text, onChangeText] = useState("");
    const [states, setStates] = useState(DATA)

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

    const filterSearchResults = (value) => {
        onChangeText(value);
        if (!value) {
            setStates(DATA);
        } else {
            setStates(DATA.filter((state) => state.includes(value)));
        }
    };

    function useAsync(asyncFn, onSuccess) {
      useEffect(() => {
        let isActive = true;
        asyncFn().then(data => {
          if (isActive) onSuccess(data);
        });
        return () => { isActive = false };
      }, [asyncFn, onSuccess]);
    }

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.flatlist}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>search</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={filterSearchResults}
                            value={text}
                            placeholder="find a location"
                            
                        />
                    </View>
                    <TabSelectorAnimation
                        onChangeTab={setIndexTab}
                        style={styles.tabSelector}
                        tabs={TABS}
                        backgroundColor='white'
                        styleTitle={styles.tabText}
                        styleTab={styles.tab}
                    />
                </View>
                <FlatList
                    style={styles.container}
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={item => POSTS.item}
                />
                {states.map((state) => {
                    return <Text>{state}</Text>;
                })}
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
        flex: 0.18,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 8},
        shadowColor: 'grey',
        padding: 5,
    },

    headerText: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    input: {
        height: 40,
        width: 250,
        marginTop: 45,
        marginRight: 20,
        borderWidth: 3,
        padding: 10,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_700Light'
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
        tintColor: Colors.dark_green
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
        alignSelf: 'center'

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
        color: '#161618',
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
        flex: 1,
        padding: 0,
        backgroundColor: Colors.background,
    }
});