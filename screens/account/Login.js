import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import {useNavigation} from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' 
import LoginForm from '../../componentes/account/LoginForm'

export default function Login() {
  
    return (
        <KeyboardAwareScrollView>   
            <Image 
              source={require("../../assets/restaurant-logo.png")}
              resizeMode='contain'
              style={styles.image}
            />
          <View style={styles.container}>
              <LoginForm />
              <CrearCuenta />
          </View>
          <Divider style={styles.divider} />
        </KeyboardAwareScrollView> 
    )
}

function CrearCuenta(props){
    const navigation = useNavigation()
    return(
        <Text 
            style={styles.registrar}
            onPress={() => navigation.navigate("register")}
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
