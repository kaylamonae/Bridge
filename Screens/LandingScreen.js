import { StyleSheet, Text, View, SafeAreaView, Pressable, Image} from 'react-native';
import Colors from '../Themes/colors';
import AppLoading from 'expo-app-loading';
import {
  useFonts, 
  Outfit_300Light,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit'

export default function LandingScreen({ navigation }) {
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
                    <Text style={styles.title}>bridge</Text>
                    <Text style={styles.caption}>bridging the gap between people & progress</Text>
                    <Pressable onPress={() => navigation.navigate('Home Screen')}> 
                        <Image style={styles.image} source={require('../assets/homescreen.png')}/>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Log In')} style={styles.bigbutton}>
                        <Text style={styles.bigbuttonText}>Log In</Text>
                    </Pressable>
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
        margin: 45, 
        marginTop: 0,
    },


    signIn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25,
        height: 40, 
        width: '30%', 
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 30
    },

    buttonText: {
        alignItems: 'center',
        color: "white",
        fontFamily: 'Outfit_700Bold',
        fontSize: 20
    },
    
    title: {
        fontSize: 65, 
        color: "white",
        fontFamily: 'Outfit_700Bold'
    },

    caption: {
        fontSize: 16, 
        color: Colors.dark_green,
        fontFamily: 'Outfit_700Bold',
        marginBottom: 20
    }, 
    
    image: {
        width: 475, 
        height: 500,
        alignSelf: 'center'
    }, 

    bigbutton: {
        flex: 1, 
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_green,
        borderRadius: 25, 
        marginTop: 50
    },

    bigbuttonText: {
        color: "white",
        fontSize: 35, 
        fontFamily: 'Outfit_700Bold',
        alignItems: 'center'
    }
});