import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import axios from 'axios';

/*une function qui renvoie l'heure (qui fonctionne de facon dynamique)*/
function GetHour() {
    const [dte, setDte] = useState(new Date());
    
    useEffect(() => {
        const maj = setInterval(() => {
            setDte(new Date());
        }, 1000);
        
        return () => clearInterval(maj);
    }, []);
    
    return (
        <Text style={styles.heur}>
            {dte.getHours()}h:{dte.getMinutes()}m:{dte.getSeconds()}s
        </Text>
    );
}

export default function Header({ ville }) {
    const [temperature, setTemperature] = useState(null);
    const [erreur, setErreur] = useState(null);

    const api_key = "57883e86d2bad79ca48b6347985c8515";//Cle d'API meteo
    const url = "https://api.openweathermap.org/data/2.5/weather";
    /*Cette function se connecte  a l'API et renvoie la meteo de cette ville */
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

    return (
        <ImageBackground style={styles.titreHeader} source={new Date().getHours()>17? require("../assets/night.jpg"):require("../assets/sky.jpg")} resizeMode="cover">
            <View style={styles.deg}>
                <Image style={styles.img} source={new Date().getHours()>12? require("../assets/full-moon.png"):require("../assets/sunny.png")} />
                <View style={styles.txtGlob}>
                    <Text style={styles.txt3}>{new Date().getHours()>12? 'Bonsoir':'Bonjour'}</Text>
                    <GetHour />
                    {erreur ? (
                        <Text style={styles.txt1}>{erreur}</Text>
                    ) : (
                        <Text style={styles.txt1}>{temperature !== null ? `${temperature}°C` : 'Chargement...'}</Text>
                    )}
                    <Text style={styles.txt2}>Burkina Faso - {ville? ville:'Ouagadougou'}</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    titreHeader: {
        marginTop: 20,
        marginHorizontal: 10,
        marginTop:10,
        height: 205,
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    img: {
        height: 128,
        width: 128,
    },
    deg: {
        flexDirection: "row",
    },
    txt1: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "white",
    },
    txt2: {
        fontSize: 14,
        fontWeight: '300',
        color: "white",
    },
    txt3: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "white",
    },
    heur: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    },
    txtGlob: {
        marginHorizontal: 15,
        justifyContent: 'center',
        textAlign: 'center',
    }
});
