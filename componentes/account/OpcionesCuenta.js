import { map } from 'lodash';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';

export default function OpcionesCuenta({user, toastRef}) {
    const menuOpciones = generarOpciones();

    return (
        <View>            
            {
                map(menuOpciones, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
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
        </View>
    )
}

function generarOpciones(){
    return [
        {
            titulo:"Cambiar Nombre y Apellido",
            nombreIconoIzq:"account-circle",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
        },
        {
            titulo:"Cambiar Email",
            nombreIconoIzq:"at",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
        },
        {
            titulo:"Cambiar Contraseña",
            nombreIconoIzq:"lock-reset",
            colorIconoIzq:"#a7bfd3",
            nombreIconoDer:"chevron-right",
            colorIconoDer:"#a7bfd3",
        }
    ]
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})
