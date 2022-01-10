import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { buscarUsuarioActual, cerrarSesion } from '../../utilidades/acciones'
import Loading from '../../componentes/Loading'
import InformacionUsuario from '../../componentes/account/InformacionUsuario'

export default function UsuarioLogueado() {
    const toastRef = useRef()
    const navegacion = useNavigation()

    const [cargando, setCargando] = useState(false)
    const [cargandoTexto, setCargandoTexto] = useState("")
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        setUsuario(buscarUsuarioActual())
    }, [])

    return (
        <View style={styles.container}>

            {
               usuario && (
                <View> 
                    <InformacionUsuario 
                    usuario={usuario} 
                    setCargando={setCargando} 
                    setCargandoTexto={setCargandoTexto} 
                    />
                    <Text>Opciones de Cuenta</Text>
                    </View>)
            }
 
            <Button 
                title="Cerrar Sesión"
                buttonStyle={styles.btnCerrarSesion}
                titleStyle={styles.btnCerrarSesionTitulo}
                onPress={() => {
                    cerrarSesion()
                    navegacion.navigate("restaurantes")
                }}
            />
            <Toast
                ref={toastRef}
                position='center'
                opacity={0.9}
            />
            <Loading 
                isVisible={cargando}
                text={cargandoTexto}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        minHeight:"100%",
        backgroundColor:"#f9f9f9"
    },
    btnCerrarSesion:{
        marginTop:30,
        borderRadius:5,
        backgroundColor:"#ffffff",
        borderTopWidth:1,
        borderTopColor:"#d64a34",
        borderBottomWidth:1,
        borderBottomColor:"#d64a34",
        paddingVertical:10
    },
    btnCerrarSesionTitulo:{
        color:"#d64a34",
    }
})
