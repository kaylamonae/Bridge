import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, FlatList, Button } from 'react-native';
import Colors from '../Themes/colors';
import { POSTS } from "./Post.js";
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { doc, collection, setDoc } from "firebase/firestore";
import { app } from '../firebase';

export default function NewPost({ navigation }) {

    const [exampleState, setExampleState] = useState(POSTS)
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const Stack = createStackNavigator();
    const onPost = () => {
    //For generating alert on buttton click
    alert('Post Uploaded');
  };
    //const posts = collection(db, "posts");


//     await setDoc(doc(posts, title), {
//     title: Title, 
//     description: Description, 
//     location: Location,
//     likes: 0,
//     comments: 0,
//     isEndorsed: false
// }    
    // const [fileUrl, setFileUrl] = React.useState(null)
    
    // const onUpload = (e) => {
    //     const file = e.target.files[0]
    //     const storageRef = app.storage().ref()
    //     const fileRef = storageRef.child(file.name)
    //     // await fileRef.put(file)
    //     // setFileUrl(await fileRef.getDownloadURL())
    // }

    // const onSumbit = () => {
    //     e.preventDefault()
    // }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={navigation.navigate('Home Screen')} style={styles.home}>
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
            </View>
            <View style={styles.bigwrap}>
                <Text style={styles.headerText}>MAKE A POST!</Text>
                <TextInput 
                    style={styles.title}
                    placeholder= "Title"
                    //value={Title}
                    //onChangeText={onChange}
                />
                <View style={styles.descriptionWrap}>
                    <TextInput 
                        style={styles.description}
                        placeholder= "Description"
                        //value={Description}
                        //onChangeText={onChange}
                    />
                </View>
                <View style={styles.subWrap}>
                    <Pressable style={styles.image} >
                        <Text style={{fontFamily: 'Outfit_700Light'}, {color:'light grey'}}>Add Image</Text>
                    </Pressable>
                    <TextInput 
                        style={styles.location}
                        placeholder= "Add Location"
                    />
                </View>
                <Pressable style={styles.submit} onPress={()=> alert("Post Uploaded!")}>
                    <Text style={styles.buttonText}>POST</Text>
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
        fontFamily: 'Outfit_400Regular',
        fontSize: 40,
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    title: {
        height: 40,
        width: 100,
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 3,
        padding: 10,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_700Light',
        alignSelf: 'flex-start'
    },

    image: {
        height: 40,
        width: 100,
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 3,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_700Light',
        justifyContent: 'center',

    },

    location: {
        height: 40,
        width: 100,
        marginTop: 20,
        marginRight: 20,
        borderWidth: 3,
        borderColor: Colors.dark_green,
        borderRadius: 15,
        fontFamily: 'Outfit_700Light',
    },

    subWrap: {
        flex: .3,
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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


    descriptionWrap: {
        flex: .8,
        marginTop: 45,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        width: '90%',
        alignSelf: 'center',
        borderColor: Colors.dark_green,
        borderWidth: 3,
        marginBottom: 10,

    },

    titleWrap: {
        flex: .2,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowOpacity: 1,
        width: '40%',
        marginLeft: 30,
        alignSelf: 'flex-start',
        borderColor: Colors.dark_green,
        borderWidth: 1,
    },

    bigwrap: {
        flex: 1,
        marginTop: 45,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowOpacity: 1,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'
    },

    description: {
        fontSize: 35,
        marginLeft: 10,
        width: "90%",
        alignSelf: 'center',
        fontFamily: 'Outfit_700Light',
        color: Colors.dark_green,

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

    home: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        height: 40, 
        width: '30%', 
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 30
    },



})

