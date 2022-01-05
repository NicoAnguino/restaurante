import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../componentes/Loading'
import { esUsuarioLogueado } from '../../utilidades/acciones'

import UsuarioInvitado from './UsuarioInvitado'
import UsuarioLogueado from './UsuarioLogueado'

export default function Account() {
    const [logueo, setLogueo] = useState(null)
    
    useEffect(() => {  
        setLogueo(esUsuarioLogueado())
    }, [])

    if(logueo == null){
        return <Loading isVisible={true} text="Cargando..." />
    }

    return logueo ? <UsuarioLogueado /> : <UsuarioInvitado />
}

const styles = StyleSheet.create({})
