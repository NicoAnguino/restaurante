import { map } from 'lodash';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../Modal';
import CambiarEmailForm from './CambiarEmailForm';
import CambiarNombreForm from './CambiarNombreForm';



export default function OpcionesCuenta({usuario, toastRef, setRecargarUsuario}) {
   

    const [mostrarModal, setMostrarModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)


    const componenteSeleccionado = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(                
                    <CambiarNombreForm 
                        displayName={usuario.displayName}
                        setMostrarModal={setMostrarModal}
                        toastRef={toastRef}
                        setRecargarUsuario = {setRecargarUsuario}
                    />
                )  
                break;
            case "email":
                setRenderComponent(
                    <CambiarEmailForm
                        email={usuario.email}
                        setMostrarModal={setMostrarModal}
                        toastRef={toastRef}
                        setRecargarUsuario = {setRecargarUsuario}
                    />
                )  
                break;
            case "password":
                setRenderComponent(
                    <Text>password</Text>
                )  
                break;
        }
        setMostrarModal(true)
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

    const menuOpciones = generarOpciones();

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
            <Modal isVisible={mostrarModal} setMostrarModal={setMostrarModal} >
                {renderComponent}
            </Modal>
        </View>
    )
}




const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#a7bfd3"
    }
})
