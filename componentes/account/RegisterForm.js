import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RegisterForm() {
    return (
        <View
          style={styles.formulario}
         >
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Email..."
            />
            <Input 
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña..."
                password={true}
                secureTextEntry={true}
            />
             <Input 
                containerStyle={styles.input}
                placeholder="Confirma tu Contraseña..."
                password={true}
                secureTextEntry={true}
            />
            <Button 
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRegistrar}
                title="Registrar Nuevo Usuario"
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
    }
})
