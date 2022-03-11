import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, 
	Alert, Platform, Pressable, Dimensions, TextInput } from 'react-native';
import { Modal } from 'react-native-modalbox';
import { Button } from 'react-native-button';
import FlatListData from '../Screens/Post.js';
import Colors from '../Themes/colors';

// export default class AddModal extends Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	showAddModal = () => {

// 	}

// 	render() {
// 	// 	return (
// 	// 		< Modal m
// 	// 			ref={"MyModal"}
// 	// 			style ={{
// 	// 		        height: 40,
// 	// 		        width: 250,
// 	// 		        marginTop: 45,
// 	// 		        marginRight: 20,
// 	// 		        borderWidth: 3,
// 	// 		        padding: 10,
// 	// 		        borderColor: Colors.dark_green,
// 	// 		        borderRadius: 15,
// 	// 		        fontFamily: 'Outfit_700Light'
// 	//     },
// 	// 				}}
// 	// 			/>
// 	// 			<Text>Add a Title Here</Text>

// 	// 		</Modal>
// 	// 	)
// 	// }
// }
