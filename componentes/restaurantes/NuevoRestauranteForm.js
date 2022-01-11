import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input,Button } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function NuevoRestauranteForm({toastRef, setCargando, navigation}) {
    
    const agregarRestaurante = () => {
        console.log("Guuardar Restaurante!")
    }
    
    return (
        <View style={styles.vistaContenedora}>
            <AgregarFormulario/>
            <Button 
                title="Crear Restaurante"
                onPress={agregarRestaurante}
                buttonStyle={styles.btnAgregarRestaurante}
            />
        </View>
    )
}

function AgregarFormulario() {
    const [pais, setPais] = useState("AR")
    const [codigoLlamada, setCodigoLlamada] = useState("54")
    const [telefono, setTelefono] = useState("")

    return (
        <View style={styles.formulario}>
            <Input
                placeholder="Nombre del Restaurante"
            />
            <Input
                placeholder="Dirección del Restaurante"
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del Restaurante"
            />
            <View style={styles.vistaTelefono}>
                <CountryPicker 
                  withFlag
                  withCallingCode
                  withFilter
                  withCallingCodeButton
                  containerStyle={styles.countryPicker}
                  countryCode={pais}
                  onSelect={(country) => {
                        setPais(country.cca2)
                        setCodigoLlamada(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputTelefono}
                /> 
            </View>
            <Input
                    placeholder="Descripción restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    vistaContenedora:{
        height:"100%"
    },
    formulario:{
        marginHorizontal:10
    },
    vistaTelefono:{
        width:"80%",
        flexDirection:"row"
    },
    countryPicker:{

    },
    inputTelefono:{
        width:"80%"
    },
    textArea:{
        height:100,
        width:"100%"
    },
    btnAgregarRestaurante:{
        margin:20,
        backgroundColor:"#d64a34"
    }
})
