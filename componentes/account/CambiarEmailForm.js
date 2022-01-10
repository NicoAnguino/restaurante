import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { actualizarPerfil } from '../../utilidades/acciones'
import { validateEmail } from '../../utilidades/helpers'

export default function CambiarEmailForm({ email,setMostrarModal,toastRef,setRecargarUsuario }) {
    const [nuevoEmailUsuario, setNuevoEmailUsuario] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const [cargando, setCargando] = useState(false)

    const onSubmit = async() => {
        if(!validarFormulario()){
            return
        }

        // setCargando(true)
        // const resultado = await actualizarPerfil({email:nuevoEmailUsuario})
        // setCargando(false)

        // if(!resultado.statusResponse){
        //     setError("Error al actualizar email")
        //     return
        // }
        // setRecargarUsuario(true)
        // toastRef.current.show("Se han actualizado nombre y apellido", 3000)
        // setMostrarModal(false)
    }

    const validarFormulario = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        
        let esValido = true;

        // console.log("Nuevo email: ",nuevoEmailUsuario)
        // console.log("Email actual: ",email)

        if(!validateEmail(nuevoEmailUsuario)){
            setErrorEmail("Formato de email incorrecto.")
            esValido = false
        }

        if(email === nuevoEmailUsuario){
            setErrorEmail("El email ingresado es el mismo que el actual.")
            esValido = false
        }

        if(isEmpty(password)){
            setErrorPassword("Debes ingresar su contraseña actual.")
            esValido = false
        }

        return esValido
    }

    return (
        <View style={styles.vista}>
            <Input
                placeholder="Ingresa tu Email..."
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(e) => setNuevoEmailUsuario(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type:"material-community",
                    name: "at",
                    color:"#c2c2c2"
                }}
            />
              <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                defaultValue={password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icono} 
                        onPress={() => setMostrarPassword(!mostrarPassword)}   
                    />
                }
            />
            <Button
                title="Cambiar Email"
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
    },
    icono:{
        color:"#c2c2c2"
    }
})
