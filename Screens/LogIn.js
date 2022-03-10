import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { db } from '../firebase';
import {
    useFonts, 
    Outfit_400Regular,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

export default function LogIn( { navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_400Regular,
    });

    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    const loginUser = async () => {
        const auth = getAuth();
        if (email.length === 0 || password.length === 0) {
            return;
        }
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password);
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
                    <Pressable onPress={() => navigation.navigate('Sign Up')} style={styles.signIn}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                    <View style={styles.popup}>
                        <Text style={styles.title}>welcome {'\n'}back</Text>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.textBox}
                                onChangeText={onChangeEmail}
                                value={email}
                                placeholder="email"
                            />
                            <TextInput
                                style={styles.textBox}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder="password"
                            />
                            <Pressable onPress={loginUser} style={styles.button}>
                                <Text style={styles.bigbuttonText}>Log In</Text>
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

    signIn: {
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
        borderRadius: 30,
    },

    title: {
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        fontSize: 55,
        marginLeft: 25,
        marginTop: 20,
        marginBottom: 190
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
        marginTop: 70
    },

    bigbuttonText: {
        color: "white",
        fontSize: 30, 
        fontFamily: 'Outfit_700Bold',
        alignItems: 'center'
    }
});