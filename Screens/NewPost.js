import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Button, Modal } from 'react-native';
import Colors from '../Themes/colors';
import { POSTS } from "./Post.js";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { doc, collection, setDoc } from "firebase/firestore";
import { app } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import { React } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,

  } from '@expo-google-fonts/outfit'
// const storage = getStorage();
    
// const uploadImageAsync = async (uri) => { // taken from expo documentation of image picker w/ firebase storage upload 

//     const storageRef = ref(storage, uri);
//     uploadBytesResumable(storageRef, uri);
//     return await getDownloadURL(storageRef);
// }

// // const class AddPost extends Component {
//         constructor(props);{
            
//         }
//     }
const auth = getAuth();
let username = "";
let photo = '../assets/blank-profile.webp';

onAuthStateChanged(auth, (user) => {
    if (user) {
        username = user.displayName;
        if (user.photoURL !== "") {
            photo = user.photoURL;
        }
    } 
});
  
export default function NewPost({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });
    const Data = {
        profile: {uri: photo},
        user: username,
        likes: 0,
        comments: 0,
        timestamp: 'just now',
    };
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');
    // const onChangeHandler = event => {
    //     setTitle(event.target.value);
    //   };
    const [exampleState, setExampleState] = useState(POSTS)
    const Stack = createStackNavigator();
    const onPost = () => {
    //For generating alert on buttton click
    alert('Post Uploaded');
    const [image, setImage] = useState("../assets/blank-profile.webp");
    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1
    //     });
    //     console.log(result);
    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //         //setImage(uploadImageAsync(result.uri));
    //     }
    //     //uploadImageAsync(image);
    // };

     

  };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={navigation.navigate('Home Screen')} style={styles.home}>
                    <Ionicons name="md-home" size={25} color="white"/>
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>
                <Text style={styles.headerText}>Make a Post!</Text>
            </View>
            <View style={styles.bigwrap}>
                <Text style={styles.question}>what's on your mind?</Text>
                <TextInput 
                    style={styles.title}
                    placeholder= "Title"
                    value={Title}
                    onChangeText={(newText)=>setTitle(newText)}
                    onEndEditing={()=>Data.title=Title}
                    
                />
                <View style={styles.descriptionWrap}>
                    <TextInput 
                        style={styles.description}
                        placeholder= "Description"
                        multiline={false}
                        value={Description}
                        onChangeText={(newText)=>setDescription(newText)}
                        onEndEditing={()=>Data.description=Description}
                    />
                </View>
                <View style={styles.subWrap}>
                    <Pressable style={styles.image} >
                        <Text style={styles.caption}>Add Image</Text>
                    </Pressable>
                    <TextInput 
                        style={styles.location}
                        placeholder= "Add Location"
                        value={Location}
                        onChangeText={(newText)=>setLocation(newText)}
                        onEndEditing={()=>Data.location=Location}
                    />
                </View>
                <Pressable style={styles.submit} onPress={()=> POSTS.push(Data)}>
                    <Text style={styles.buttonText}>Post</Text>
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
        flex: 0.22,
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
        // marginTop: 35,
        marginLeft: 20,
        marginBottom: 20
    },

    title: {
        height: 40,
        width: "35%",
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 3,
        padding: 10,
        borderColor: Colors.dark_green,
        borderRadius: 25,
        fontFamily: 'Outfit_400Regular',
        fontSize: 18,
        alignSelf: 'flex-start'
    },

    image: {
        height: 40,
        width: '35%',
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        justifyContent: 'center',
    },

    location: {
        height: 40,
        width: '35%',
        marginTop: 20,
        marginRight: 20,
        borderWidth: 3,
        borderColor: Colors.dark_green,
        borderRadius: 25,
        fontFamily: 'Outfit_400Regular',
        padding: 10,
        fontSize: 18
    },

    subWrap: {
        flex: .3,
        width: '100%',
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
        fontFamily: 'Outfit_400Regular',
        fontSize: 15,
    },

    caption: {
        fontFamily: 'Outfit_700Bold',
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },

    descriptionWrap: {
        flex: .8,
        marginTop: 30,
        borderRadius: 25,
        width: '90%',
        alignSelf: 'center',
        borderColor: Colors.dark_green,
        borderWidth: 3,
        padding: 3
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
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    description: {
        fontSize: 35,
        marginLeft: 10,
        width: "90%",
        alignSelf: 'center',
        fontFamily: 'Outfit_400Regular',
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
        width: '35%', 
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30
    },

    buttonText: {
        alignItems: 'center',
        color: "white",
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        marginLeft: 5
    },

    home: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        height: 40, 
        width: '25%', 
        alignSelf: 'flex-start',
        marginTop: 60,
        marginLeft: 30
    },

    question: {
        fontSize: 35,
        fontFamily: 'Outfit_400Regular',
        color: Colors.dark_green,
        marginTop: 20
    }

})

