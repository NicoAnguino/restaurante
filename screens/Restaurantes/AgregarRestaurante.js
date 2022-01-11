import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../componentes/Loading'
import NuevoRestauranteForm from '../../componentes/restaurantes/NuevoRestauranteForm'

export default function AgregarRestaurante({navigation}) {
    const toastRef = useRef()
    const [cargando, setCargando] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <NuevoRestauranteForm toastRef={toastRef} setCargando={setCargando}/>
            <Loading isVisible={cargando} text="Creando Restaurante..."/>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
