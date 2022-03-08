import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput } from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import {
    useFonts, 
    Outfit_300Light,
    Outfit_700Bold,
  } from '@expo-google-fonts/outfit'

export default function LogIn( { navigation }) {
    let [fontsLoaded] = useFonts({
        Outfit_700Bold, 
        Outfit_300Light,
    });

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
        marginTop: 20
       
    }
});