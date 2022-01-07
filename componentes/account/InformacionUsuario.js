import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { importarImagenGaleria } from '../../utilidades/helpers'

export default function InformacionUsuario({usuario}) {
       
    const cambiarFoto = async() => {
        const result = await importarImagenGaleria([1,1])
        console.log(result)
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded={true}
                size="large"
                onPress={() => cambiarFoto()}
                source={
                    usuario.photoURL
                    ? {url: usuario.photoURL}
                    : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUsuario}>
                <Text style={styles.displayName}>{ usuario.displayName ? usuario.displayName : "Anónimo" }</Text>
                <Text>{ usuario.email }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f9f9f9",
        paddingVertical:30
    },
    infoUsuario:{
        marginLeft:20
    },
    displayName:{
        fontWeight:"bold",
        paddingBottom:5
    }
})
