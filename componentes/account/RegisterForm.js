import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

export default function RegisterForm() {
    const [mostrarPassword, setMostrarPassword] = useState(false)
 

    const valoresPorDefectoFormulario = () => {
        return{email: "", password: "", confirm: ""}
    }

    const [datosFormulario, setDatosFormulario] = useState(valoresPorDefectoFormulario())

    const onChange = (e, type) => {
        setDatosFormulario({ ...datosFormulario, [type]: e.nativeEvent.text })
    }

    return (
        <View
          style={styles.formulario}
         >
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Email..."
                onChange={(e) => onChange(e, "email")}
            />
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={!mostrarPassword}
                onChange={(e) => onChange(e, "password")}
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
                onPress={() => console.log(datosFormulario)}
            />
        </View>
    )
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
