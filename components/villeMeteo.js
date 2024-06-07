import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Home({ville}){
    
    return (
        <View>
             <Image style={styles.img} source={require("../assets/sunny.png")}/>
             <Text>{ville}</Text>
             <Text></Text>
        </View>
    )
}