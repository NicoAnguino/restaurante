import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase'

import Loading from '../../componentes/Loading'

export default function Restaurantes({navigation}) {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {      
        firebase.auth().onAuthStateChanged((infoUsuario) => {
            infoUsuario ? setUsuario(true) : setUsuario(false)
        })
    }, [])

    if(usuario === null){
        return <Loading isVisible={true} text="Cargando..." />
    }

    return (
        <View style={styles.cuerpoVista}>
            <Text>Listado de Restaurantes</Text>

            {
                usuario &&
                <Icon
                    type="material-community"
                    name="plus"
                    color="#d64a34"
                    reverse={true}
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("agregar-restaurante")}
                />
            }
        </View>
    )
}

//ocupar todo el espacio disponible
//donde va a estar anclado
const styles = StyleSheet.create({
    cuerpoVista:{
        flex:1
    },
    btnContainer:{
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor:"black",
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5
    }
})
