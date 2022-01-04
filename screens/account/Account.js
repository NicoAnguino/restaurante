import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
//import { esUsuarioLogueado } from '../../utilidades/acciones'

import firebase from 'firebase/app'

import Loading from '../../componentes/Loading'

import UsuarioInvitado from './UsuarioInvitado'
import UsuarioLogueado from './UsuarioLogueado'
import { buscarUsuarioActual } from '../../utilidades/acciones'

export default function Account() {
    const [logueo, setLogueo] = useState(null)
    
    useEffect(() => {
        
        const usuarioActual = buscarUsuarioActual()
        usuarioActual ? setLogueo(true) : setLogueo(false)
    }, [])

    //firebase.auth().onAuthStateChanged((user) => {
      //  user !== null ? (setLogueo(true)) : setLogueo(false)
    //})

if(logueo == null){
    //return <Text>Cargando...</Text>
    return <Loading isVisible={true} text="Cargando..." />
}

    return logueo ? <UsuarioLogueado /> : <UsuarioInvitado />
}

const styles = StyleSheet.create({})
