import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, FlatList, Button } from 'react-native';
import Colors from '../Themes/colors';
import { POSTS } from "./Post.js";
import { useState } from 'react';
export default function NewPost({ navigation }) {

    const [exampleState, setExampleState] = useState(POSTS)
    const ID = 6

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
                    Make A Post!
                </Text>
            </View>
            <Button
                title="Add element"
                onPress={addElement}
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
})

