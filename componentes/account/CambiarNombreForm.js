import { map } from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function CambiarNombreForm({ displayName,setMostrarModal,toastRef }) {
    return (
        <View style={styles.vista}>
            <Input
                placeholder="Ingresa tu Nombre y Apellido"
                containerStyle={styles.input}
                defaultValue={displayName}
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
