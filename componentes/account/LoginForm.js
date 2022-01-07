import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { loguearUsuario } from '../../utilidades/acciones'
import { validateEmail } from '../../utilidades/helpers'
import Loading from '../Loading'

export default function LoginForm() {
    const [mostrarPassword, setMostrarPassword] = useState(false)   
    const [datosFormulario, setDatosFormulario] = useState(valoresPorDefectoFormulario())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [cargando, setCargando] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setDatosFormulario({ ...datosFormulario, [type]: e.nativeEvent.text })   
    }

    const validarIniciarSesion = async() => {
        if(!validarDatos()){
            return;
        }

        setCargando(true)
        const resultado = await loguearUsuario(datosFormulario.email, datosFormulario.password)
        setCargando(false)

        if(!resultado.statusResponse){
            setErrorEmail(resultado.error)
            setErrorPassword(resultado.error)
            return
        }

        navigation.navigate("account")
    }

    const validarDatos = () => {
        setErrorEmail("")
        setErrorPassword("")
        let esValido = true

        if(!validateEmail(datosFormulario.email)){
            setErrorEmail("Debes de ingresar un Email Válido.")
            esValido=false
        }

        if(isEmpty(datosFormulario.password)){
            setErrorPassword("Debes de ingresar una Contraseña.")
            esValido=false
        }
        
        return esValido
    }

    return (
        <View style={styles.container}>
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType = "email-address"
                errorMessage={errorEmail}
                defaultValue={datosFormulario.email}
            />
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={datosFormulario.password}
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
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRegistrar}
                title="Iniciar Sesión"
                onPress={() => validarIniciarSesion()}
            />
               <Loading 
                isVisible={cargando}
                text="Iniciando cuenta..."
            />
        </View>
    )
}

const valoresPorDefectoFormulario = () => {
    return{email: "", password: ""}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    input:{
        width: "100%"
    },
    btnContainer:{
        marginTop:20,
        width:"95%",
        alignSelf:"center"
    },
    btnRegistrar:{
        backgroundColor:"#d64a34"
    },
    icono:{
        color:"#c1c1c1"
    }
})
