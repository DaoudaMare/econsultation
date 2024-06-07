import React from 'react';
import { Button, StyleSheet,Image, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const today = new Date();

const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const jourIndex = today.getDay();

const jourEnLettres = joursDeLaSemaine[jourIndex];


export default function MeteoService({ville}){
    const [temperature, setTemperature] = useState(null);
    const [erreur, setErreur] = useState(null);

    const api_key = "57883e86d2bad79ca48b6347985c8515";
    const url = "https://api.openweathermap.org/data/2.5/weather";

    useEffect(() => {
        const getMeteoParVille = async () => {
            try {
                const response = await axios.get(`${url}?q=${ville},BF&APPID=${api_key}&units=metric`);
                if (response.data && response.data.main) {
                    setTemperature(response.data.main.temp);
                } else {
                    setErreur('Impossible de récupérer les données météorologiques');
                }
            } catch (error) {
                console.error(error);
                setErreur('Impossible de récupérer les données météorologiques');
            }
        };

        getMeteoParVille();
    }, [ville]);

    return(
        <View style={styles.meteoview}>
            <Image  source={new Date().getHours()>12? require("../assets/half-moon.png"):require("../assets/sunny.png")} />
            <View style={styles.ville}>
                <Text style={styles.day}>{jourEnLettres}</Text>
                <Text style={styles.temp}>{temperature}°C</Text>
            </View>
            <View style={styles.ville}>
                <Text style={styles.txtville}>Ville:</Text>
                <Text style={styles.vil}>{ville}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    meteoview:{
        flexDirection: "row",
        borderWidth:1,
        borderRadius:25,
        height:150,
        marginHorizontal:18,
        marginVertical:15,
        backgroundColor:'#615EFC',
    },
    temp:{
        color:'white',
        marginHorizontal:10,
        fontSize:25,
        fontWeight:'bold',
        justifyContent:'center',
        alignSelf:'center',
    },
    ville:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    vil:{
        color:'white',
        fontWeight:'bold'
    },
    txtville:{
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    day:{
        color:'white',
        fontWeight:'300'
    }
})