import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Comments from "./Comments.js";
import Home from "./HomeScreen.js";

const screens = {
    Home: {
        screen: Home
    },

    Comments: {
    	screen: Comments
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);