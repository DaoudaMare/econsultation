import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './header';
import MeteoService from './meteoService';

export default function Home({ route }) {
    const val = route.params;

    return (
        <View style={styles.contain}>
            <Header ville={val}/>
            <ScrollView contentContainerStyle={styles.scrollViewbox}>
                <MeteoService ville="Banfora"/>
                <MeteoService ville="Dori" />
                <MeteoService ville="Kaya" />
                <MeteoService ville="Ouahigouya" />
                <MeteoService ville="Bobo Dioulasso" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
    },
    scrollViewbox: {
        padding: 0,
    },
});

