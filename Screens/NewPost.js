import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, FlatList, Button } from 'react-native';
import Colors from '../Themes/colors';
import { POSTS } from "./Post.js";
import { useState } from 'react';
export default function NewPost({ navigation }) {

    const [exampleState, setExampleState] = useState(POSTS)

    const addElement = () => {
        var newPost = [...POSTS , {id : "6", user: "Caleb Robinson", profile: null, picture: null, 
        description: "We need more late-night dining options!", location: "Stanford University", 
        likes: "500", comments: "55", timestamp: "Just Now",
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
})

