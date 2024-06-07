import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Search({navigation}){
    const [val,setval]= useState(" ")
    const handleChange=(e)=>{
        navigation.navigate("Méteo",val)
    }
    return (
        <View>
                <TextInput
                    style={styles.field}
                    value={val}
                    onChangeText={setval}
                    placeholder='Rechercher une ville'
                />

                <Button
                    style={styles.btn}
                    onPress={handleChange}
                    title='Rechercher'
                />
        </View>
    )
}

const styles = StyleSheet.create({
    field:{
        borderBottomColor:'orange',
        borderBottomWidth:3,
        marginHorizontal:30,
        marginVertical:30,
    },
    btn:{
        marginHorizontal:30,
    },
})