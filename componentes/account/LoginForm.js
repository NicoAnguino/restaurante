import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
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

    const validarIniciarSesion = () => {
        console.log("login!")
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
