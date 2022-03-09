import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, FlatList, Button } from 'react-native';
import Colors from '../Themes/colors';
import { POSTS } from "./Post.js";
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
export default function NewPost({ navigation }) {

    const [exampleState, setExampleState] = useState(POSTS)
    const ID = 6
    const description = ""
    const Stack = createStackNavigator();

    const addElement = () => {
        var newPost = [...POSTS , {id : ID, user: "", profile: null, picture: null, 
        description: "", location: "", 
        likes: "", comments: "", timestamp: "",
            }];
        setExampleState(newPost);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Create A Post
                </Text>
            </View>
            <View style={styles.guide}>
                <Text style={styles.guideText}>
                    Add a short description to convey your message!
                </Text>
            </View>
            <View style={styles.wrap}>
                <TextInput 
                    style={styles.input}
                    placeholder= "Write a description"
                    onChangeText={description}
                />
            </View>
            <View style={styles.navigate}>
                <Pressable style={styles.submit}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    title: {
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

    guide: {
        flex: .5,
        marginTop: 40,
        alignItems: 'center',
        borderRadius: 15,
    },

    guideText: {
        color: 'black',
        fontFamily: 'Outfit_700Light',
        fontSize: 15,
    },


    wrap: {
        flex: .25,
        marginTop: 45,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        width: '90%',
        alignSelf: 'center',

    },

    input: {
        fontSize: 35,
        marginLeft: 10,
        width: "90%",
        alignSelf: 'center',
        fontFamily: 'Outfit_700Light',

    },

    navigate: {
        flex: .2,
        justifyContent: 'center',

    },


    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        height: 40, 
        width: '30%', 
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30
    },

    buttonText: {
        alignItems: 'center',
        color: "white",
        fontFamily: 'Outfit_700Bold',
        fontSize: 20
    },

})

