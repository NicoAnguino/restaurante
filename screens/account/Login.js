import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'

export default function Login() {
    return (
        <ScrollView>
           
            <Image 
              source={require("../../assets/restaurant-logo.png")}
              resizeMode='contain'
              style={styles.image}
            />
          <View style={styles.container}>
              <Text>Formulario de Logueo</Text>
              <CrearCuenta />
          </View>
          <Divider style={styles.divider} />
        </ScrollView> 
    )
}

function CrearCuenta(props){
    return(
        <Text 
            style={styles.registrar}
            onPress={() => console.log("Registrar")}
        >
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnRegistrar}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image:{
        height:150,
        width:"100%",
        marginTop:20,
        marginBottom:20
    },
    container:{
        marginHorizontal:40
    },
    divider:{
        backgroundColor:"#d64a34",
        margin:40
    },
    registrar:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf:"center"
    },
    btnRegistrar:{
        color:"#d64a34",
        fontWeight:"bold"
    }
})
