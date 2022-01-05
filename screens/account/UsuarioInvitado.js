import React from 'react'
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native'
//import { Button } from 'react-native-elements/dist/buttons/Button'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UsuarioInvitado() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image 
                source={require("../../assets/restaurant-logo.png")}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil en Restaurantes</Text>
            <Text style={styles.descripcion}>¿Cómo describirías tu mejor Restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla,
            votá cuál te ha gustado más y comenta cómo ha sido tu experiencia</Text>
            <Button 
                title="Ver tu perfil"
                buttonStyle={styles.bottonInicio}
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        marginHorizontal:30
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:10
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginVertical:10,
        textAlign:"center"
    },
    descripcion:{
        textAlign:"justify",
        marginVertical:10,
        marginBottom:20,
        color: "#d64a34"
    },
    bottonInicio:{
        backgroundColor:"#d64a34"
    }
})
