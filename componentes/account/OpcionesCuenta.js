import { map } from 'lodash';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../Modal';



export default function OpcionesCuenta({user, toastRef}) {
    const menuOpciones = generarOpciones();
    const [mostrarModal, setMostrarModal] = useState(false)
  

    return (
        <View>            
            {
                map(menuOpciones, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.nombreIconoIzq}
                            color={menu.colorIconoIzq}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.titulo}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.nombreIconoDer}
                            color={menu.colorIconoDer}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={mostrarModal} setMostrarModal={setMostrarModal}>
                <Text>Texto dentro del Modal</Text>
            </Modal>
        </View>
    )
}

const generarOpciones = () => {
    return [
        {
            titulo:"Cambiar Nombre y Apellido",
            nombreIconoIzq:"account-circle",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
            onPress: () => componenteSeleccionado("displayName")
        },
        {
            titulo:"Cambiar Email",
            nombreIconoIzq:"at",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
            onPress: () => componenteSeleccionado("email")
        },
        {
            titulo:"Cambiar Contraseña",
            nombreIconoIzq:"lock-reset",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
            onPress: () => componenteSeleccionado("password")
        }
    ]
}

const componenteSeleccionado = (key) => {
    console.log(key)
 
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})
