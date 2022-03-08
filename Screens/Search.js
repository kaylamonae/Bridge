import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
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

const TABS = [{title: 'Local'}, {title: 'Other Communities'}];
const DATA = ['Pothole', 'Parks', 'Schools'];

export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_300Light,
    });

    const [indexTab, setIndexTab] = useState(0);
    const [text, onChangeText] = useState("");
    const [states, setStates] = useState(DATA)

    const filterSearchResults = (value) => {
        onChangeText(value);
        if (!value) {
            setStates(DATA);
        } else {
            setStates(DATA.filter((state) => state.includes(value)));
        }
    };

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>search</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={filterSearchResults}
                            value={text}
                            placeholder="search bridge"
                            
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
    },

    headerText: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 35,
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
        fontFamily: 'Outfit_300Light'
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
    }
});