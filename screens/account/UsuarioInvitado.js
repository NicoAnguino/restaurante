import React from 'react'
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native'
//import { Button } from 'react-native-elements/dist/buttons/Button'
import { Button } from 'react-native-elements'

export default function UsuarioInvitado() {
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
                onPress={()=>console.log("Click!!!")}
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
        marginBottom:10,
        textAlign:"center"
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
        color: "#d11f0d"
    },
    bottonInicio:{
        backgroundColor:"#d11f0d"
    }
})
