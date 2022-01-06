import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' 
import RegisterForm from '../../componentes/account/RegisterForm'


export default function Register() {
    return (
        <KeyboardAwareScrollView style={styles.container}>
              <Image 
              source={require("../../assets/restaurant-logo.png")}
              resizeMode='contain'
              style={styles.image}
            />
            <RegisterForm />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        height:150,
        width:"100%",
        marginTop:0,
        marginBottom:20
    },
    container:{
        flex:1,
        marginTop:30
    }
})
