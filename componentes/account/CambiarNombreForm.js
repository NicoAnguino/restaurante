import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { actualizarPerfil } from '../../utilidades/acciones'

export default function CambiarNombreForm({ displayName,setMostrarModal,toastRef,setRecargarUsuario }) {
    const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState(null)
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    const onSubmit = async() => {
        if(!validarFormulario()){
            return
        }

        setCargando(true)
        const resultado = await actualizarPerfil({displayName:nuevoNombreUsuario})
        setCargando(false)

        if(!resultado.statusResponse){
            setError("Error al actualizar nombre")
            return
        }
        setRecargarUsuario(true)
        toastRef.current.show("Se han actualizado nombre y apellido", 3000)
        setMostrarModal(false)
    }

    const validarFormulario = () => {
        setError(null)
        
        if(isEmpty(nuevoNombreUsuario)){
            setError("Debe ingresar un nuevo nombre.")
            return false
        }

        if(displayName === nuevoNombreUsuario){
            setError("El nombre ingresado es el mismo que el actual.")
            return false
        }

        return true
    }

    return (
        <View style={styles.vista}>
            <Input
                placeholder="Ingresa tu Nombre y Apellido"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNuevoNombreUsuario(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type:"material-community",
                    name: "account-circle-outline",
                    color:"#c2c2c2"
                }}
            />
            <Button
                title="Cambiar Nombre y Apellido"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={cargando}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    vista:{
        alignItems:"center",
        paddingVertical:10
    },
    input:{
        marginBottom:10
    },
    btnContainer:{
        width:"95%"        
    },
    btn:{
        backgroundColor:"#d64a34"
    }
})
