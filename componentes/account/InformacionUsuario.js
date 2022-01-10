import React, {useState} from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { actualizarPerfil, subirImagen } from '../../utilidades/acciones'
import { importarImagenGaleria } from '../../utilidades/helpers'

export default function InformacionUsuario({usuario,setCargando,setCargandoTexto}) {
       
    const [urlImagen, setUrlImagen] = useState(usuario.photoURL)
    const cambiarFoto = async() => {
        const result = await importarImagenGaleria([1,1])
       
        if(!result.status){
            return
        }

        setCargandoTexto("Actualizando imagen...")
        setCargando(true)
        const resultadoSubirImagen = await subirImagen(result.image, "avatares", usuario.uid)
        if(!resultadoSubirImagen.statusResponse){
            setCargando(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }
        const resultadoActualizarPerfil = await actualizarPerfil({photoURL: resultadoSubirImagen.url})
        setCargando(false)
        if(resultadoActualizarPerfil.statusResponse){
            console.log(resultadoSubirImagen.url)
            setUrlImagen(resultadoSubirImagen.url)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded={true}
                size="large"
                onPress={() => cambiarFoto()}
                source={
                    urlImagen
                    ? {uri: urlImagen}
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
