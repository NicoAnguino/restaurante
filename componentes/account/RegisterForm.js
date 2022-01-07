
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utilidades/helpers'
import { registrarUsuario } from '../../utilidades/acciones'
import Loading from '../Loading'

export default function RegisterForm() {
    
  
    
    const [mostrarPassword, setMostrarPassword] = useState(false)   
    const [datosFormulario, setDatosFormulario] = useState(valoresPorDefectoFormulario())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [cargando, setCargando] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setDatosFormulario({ ...datosFormulario, [type]: e.nativeEvent.text })   
    }

    const validarRegistrarUsuario = async() => {
        if(!validarDato()){
            return;
        }
        
        setCargando(true)
        const resultado = await registrarUsuario(datosFormulario.email, datosFormulario.password)
        setCargando(false)
        if(!resultado.statusResponse){
            setErrorEmail(resultado.error)
            return
        }

        navigation.navigate("account")
    }

    const validarDato = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let esValido = true

        if(!validateEmail(datosFormulario.email)){
            setErrorEmail("Debes de ingresar un Email Válido.")
            esValido=false
        }

        if(size(datosFormulario.password) < 6){
            setErrorPassword("La contraseña debe tener al menos 6 dígitos.")
            esValido = false
        }

        if(size(datosFormulario.confirm) < 6){
            setErrorConfirm("La confirmación de contraseña debe tener al menos 6 dígitos.")
            esValido = false
        }
        
        if(datosFormulario.password !== datosFormulario.confirm){
            setErrorPassword("La contraseña y la confirmación no coinciden.")
            setErrorConfirm("La contraseña y la confirmación no coinciden.")
            esValido = false
        }
        
        return esValido
    }

    return (
        <View
          style={styles.formulario}
         >
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
             <Input 
                containerStyle={styles.input}
                placeholder="Confirma tu Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={datosFormulario.confirm}
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
                title="Registrar Nuevo Usuario"
                onPress={() => validarRegistrarUsuario()}
            />
            <Loading 
                isVisible={cargando}
                text="Creando cuenta..."
            />
        </View>
    )
}

const valoresPorDefectoFormulario = () => {
    return{email: "", password: "", confirm: ""}
}

const styles = StyleSheet.create({
    formulario:{
        marginTop:30
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
