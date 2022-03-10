import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Colors from './Themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from "./Screens/LandingScreen";
import LogIn from "./Screens/LogIn";
import SignUp from "./Screens/SignUp";
import HomeScreen from "./Screens/HomeScreen";
import Search from "./Screens/Search";
import NewPost from "./Screens/NewPost";
import Profile from "./Screens/Profile";
import comment from "./Screens/Comments";
import prof from "./Screens/Profile";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'md-home' : 'md-home-outline'
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'md-search' : 'md-search-outline'
                    } else if (route.name === 'Profile') {
                      iconName = focused ? 'md-person-circle' : 'md-person-circle-outline'
                    } else {
                        iconName = 'md-add'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: Colors.accent,
                tabBarInactiveTintColor: Colors.background,
                tabBarStyle: {
                  backgroundColor: Colors.dark_green,
                }
            })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Tab.Screen name="New Post" component={NewPost} options={{headerShown: false}}/>
            <Tab.Screen name="Search" component={Search} options={{headerShown: false}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing Screen" component={LandingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Log In" component={LogIn} options={{headerShown: false}}/>
        <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Home Screen" component={HomeTabs} options={{headerShown: false}}/>
        <Stack.Screen name="comments" component={comment} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={prof} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
