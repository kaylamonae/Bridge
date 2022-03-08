import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Colors from '../Themes/colors';
export default function NewPost({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>New Post Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.background,
    },
})

