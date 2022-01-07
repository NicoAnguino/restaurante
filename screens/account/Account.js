import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../componentes/Loading'
import { buscarUsuarioActual, esUsuarioLogueado } from '../../utilidades/acciones'
import { useFocusEffect } from '@react-navigation/native'

import UsuarioInvitado from './UsuarioInvitado'
import UsuarioLogueado from './UsuarioLogueado'

export default function Account() {
    const [logueo, setLogueo] = useState(null)
    
    useFocusEffect(
        useCallback(() => { 
            const usuario = buscarUsuarioActual()
            usuario ? setLogueo(true) : setLogueo(false)      
        }, [])
    )

    if(logueo == null){
        return <Loading isVisible={true} text="Cargando..." />
    }

    return logueo ? <UsuarioLogueado /> : <UsuarioInvitado />
}

const styles = StyleSheet.create({})
