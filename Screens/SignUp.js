import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Alert, Image } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, doc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
} from '@expo-google-fonts/outfit'

const storage = getStorage();


const uploadImageAsync = async (uri) => { // taken from expo documentation of image picker w/ firebase storage upload 
    // const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function () {
    //       resolve(xhr.response);
    //     };
    //     xhr.onerror = function (e) {
    //       console.log(e);
    //       reject(new TypeError("Network request failed"));
    //     };
    //     xhr.responseType = "blob";
    //     xhr.open("GET", uri, true);
    //     xhr.send(null);
    // });
    
    const storageRef = ref(storage, uri);
    uploadBytesResumable(storageRef, uri);
    // const result = await uploadBytes(storageRef, blob);
    // blob.close();
    return await getDownloadURL(storageRef);
}

export default function SignUp({ navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });

    const [image, setImage] = useState("../assets/blank-profile.webp");
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            //setImage(uploadImageAsync(result.uri));
        }
        //uploadImageAsync(image);
    };



    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [username, onChangeUID] = useState("");
    const usersCollectionRef = collection(db, 'users');

    const signUpUser = async () => {
        const auth = getAuth();
        if (email.length === 0 || password.length === 0) {
            return;
        }
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(collection(db, 'users'), {
                name: username,
                email: userCredential.user.email
            })
            userCredential.user.displayName = username;
            userCredential.user.photoURL = image;
            navigation.navigate('Home Screen');
        } catch (err) {
            Alert.alert(
                "Error",
                err.code,
                [
                    {
                        text: "Ok",
                        onPress: () => console.log(err.code),
                    }
                ]
            )
        }
    }

    if (!fontsLoaded) { 
        return <AppLoading/>;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Pressable onPress={() => navigation.navigate('Log In')} style={styles.login}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                    <View style={styles.popup}>
                        <Text style={styles.title}>join {'\n'}bridge</Text>
                        {image && <Image style={styles.image} source={{uri : image}}/>}
                        <Pressable  style={styles.button} onPress={pickImage}>
                            <Text style={styles.caption}>upload a profile picture</Text>
                        </Pressable> 

                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.textBox}
                                onChangeText={onChangeUID}
                                value={username}
                                placeholder="username"
                            />
                            <TextInput
                                style={styles.textBox}
                                onChangeText={onChangeEmail}
                                value={email}
                                placeholder="email"
                            />
                            <TextInput
                                style={styles.textBox}
                                secureTextEntry={true}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder="password"
                            />
                            <Pressable onPress={signUpUser} style={styles.button}>
                                <Text style={styles.bigbuttonText}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background,
    }, 

    content: {
        flex: 1, 
        margin: 15,
        marginBottom: 0
    },

    login: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        height: 40,
        width: '30%',
        alignSelf: 'flex-end',
        marginBottom: 100
    }, 

    buttonText: {
        alignItems: 'center',
        color: "white",
        fontFamily: 'Outfit_700Bold',
        fontSize: 20
    },

    popup: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 30
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 55,
        marginLeft: 25,
        marginTop: 20,
        marginBottom: 50
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBox: {
        borderWidth: 3,
        borderColor: Colors.dark_green,
        borderRadius: 25,
        width: '80%',
        margin: 10,
        padding: 10,
        fontSize: 18,
        fontFamily: 'Outfit_400Regular',
    },

    button: { 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25, 
        width: '80%',
        padding: 5,
        marginTop: 30
    },

    bigbuttonText: {
        color: "white",
        fontSize: 30, 
        fontFamily: 'Outfit_700Bold',
        alignItems: 'center'
    }, 

    image: {
        width: 100,
        height: 100,
        borderRadius: 25,
        alignSelf: 'center',
    },

    caption: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 24,
        color: 'white'
    }
});