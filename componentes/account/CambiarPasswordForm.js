import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { actualizarPassword, reAutenticar } from '../../utilidades/acciones'

export default function CambiarPasswordForm({ setMostrarModal,toastRef }) {
    const [nuevoPassword, setNuevoPassword] = useState(null)
    const [passwordActual, setPasswordActual] = useState(null)
    const [passwordConfirmacion, setPasswordConfirmacion] = useState(null)
    const [errorNuevoPassword, setErrorNuevoPassword] = useState(null)
    const [errorPasswordActual, setErrorPasswordActual] = useState(null)
    const [errorPasswordConfirmacion, setErrorPasswordConfirmacion] = useState(null)
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const [cargando, setCargando] = useState(false)

    const onSubmit = async() => {
        if(!validarFormulario()){
            return
        }

        setCargando(true)
        const resultadoReAutentitacion = await reAutenticar(passwordActual)
         if(!resultadoReAutentitacion.statusResponse){
            setCargando(false)
            setErrorPasswordActual("Contraseña incorrecta.")
            return
        }
         
        const resultadoCambiarPassword = await actualizarPassword(nuevoPassword)     
        setCargando(false)  
        if(!resultadoCambiarPassword.statusResponse){     
            setNuevoPassword("Hubo un problema al cambiar la contraseña.")
            return
        }
        toastRef.current.show("Se ha actualizado la Contraseña", 3000)
        setMostrarModal(false)
    }

    const validarFormulario = () => {
        setErrorNuevoPassword(null)
        setErrorPasswordActual(null)
        setErrorPasswordConfirmacion(null)
        
        let esValido = true;

        if(isEmpty(passwordActual)){
            setErrorPasswordActual("Debes ingresar su contraseña actual.")
            esValido = false
        }

        if(size(nuevoPassword) < 6){
            setErrorNuevoPassword("La nueva contraseña debe ser de al menos 6 dígitos.")
            esValido = false
        }

        if(size(passwordConfirmacion) < 6){
            setErrorPasswordConfirmacion("La nueva contraseña debe ser de al menos 6 dígitos.")
            esValido = false
        }

        if(nuevoPassword !== passwordConfirmacion){
            setErrorNuevoPassword("Las contraseñas no coinciden.")
            setErrorPasswordConfirmacion("Las contraseñas no coinciden.")
            esValido = false
        }

        if(nuevoPassword === passwordActual){
            setErrorPasswordActual("La contraseña debe ser diferente a la actual.")
            setErrorNuevoPassword("La contraseña debe ser diferente a la actual.")
            setErrorPasswordConfirmacion("La contraseña debe ser diferente a la actual.")
            esValido = false
        }

        return esValido
    }

    return (
        <View style={styles.vista}>
              <Input 
                containerStyle={styles.input}
                placeholder="Contraseña Actual..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => setPasswordActual(e.nativeEvent.text)}
                errorMessage={errorPasswordActual}
                defaultValue={passwordActual}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icono} 
                        onPress={() => setMostrarPassword(!mostrarPassword)}   
                    />
                }
            />
             <Input 
                containerStyle={styles.input}
                placeholder="Nueva Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => setNuevoPassword(e.nativeEvent.text)}
                errorMessage={errorNuevoPassword}
                defaultValue={nuevoPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icono} 
                        onPress={() => setMostrarPassword(!mostrarPassword)}   
                    />
                }
            />
             <Input 
                containerStyle={styles.input}
                placeholder="Confirmación de Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => setPasswordConfirmacion(e.nativeEvent.text)}
                errorMessage={errorPasswordConfirmacion}
                defaultValue={passwordConfirmacion}
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
                title="Cambiar Contraseña"
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
