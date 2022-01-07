import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { cerrarSesion } from '../../utilidades/acciones'

export default function UsuarioLogueado() {
    const navegacion = useNavigation()
    return (
        <View>
            <Text>Hola Usuario Logueado!</Text>
            <Button 
                title="Cerrar Sesión"
                onPress={() => {
                    cerrarSesion()
                    navegacion.navigate("restaurantes")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
