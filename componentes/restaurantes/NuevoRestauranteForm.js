import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Input,Button, Icon } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function NuevoRestauranteForm({toastRef, setCargando, navigation}) {
    const [datosFormulario, setDatosFormulario] = useState(valoresDefectoFormulario())
    const [errorNombre, setErrorNombre] = useState(null)
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorTelefono, setErrorTelefono] = useState(null)
    const [errorDireccion, setErrorDireccion] = useState(null)

    const agregarRestaurante = () => {
        console.log(datosFormulario)
    }
    
    return (
        <View style={styles.vistaContenedora}>
            <AgregarFormulario
                datosFormulario={datosFormulario}
                setDatosFormulario={setDatosFormulario}
                errorNombre={errorNombre}
                errorDescripcion={errorDescripcion}
                errorEmail={errorEmail}
                errorTelefono={errorTelefono}
                errorDireccion={errorDireccion}
            />
            <SubirImagen
            />
            <Button 
                title="Crear Restaurante"
                onPress={agregarRestaurante}
                buttonStyle={styles.btnAgregarRestaurante}
            />
        </View>
    )
}


function SubirImagen(){
    return(
        <ScrollView
            horizontal
            style={styles.vistaImagen}
        >
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
            />
        </ScrollView>
    )
}

function AgregarFormulario({datosFormulario,setDatosFormulario,errorNombre,errorDescripcion,errorEmail,errorTelefono,errorDireccion}) {
    const [pais, setPais] = useState("AR")
    const [codigoLlamada, setCodigoLlamada] = useState("54")
    const [telefono, setTelefono] = useState("")

    const onChange = (e, type) =>{
        setDatosFormulario({...datosFormulario, [type]: e.nativeEvent.text})
    }

    return (
        <View style={styles.formulario}>
            <Input
                placeholder="Nombre del Restaurante"
                defaultValue={datosFormulario.nombre}
                onChange={(e) => onChange(e, "nombre")}
                errorMessage={errorNombre}
            />
            <Input
                placeholder="Dirección del Restaurante"
                defaultValue={datosFormulario.direccion}
                onChange={(e) => onChange(e, "direccion")}
                errorMessage={errorDireccion}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del Restaurante"
                defaultValue={datosFormulario.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
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
                        setDatosFormulario({...datosFormulario, "pais":country.cca2, "codigoInternacional":country.callingCode[0]})
                        setPais(country.cca2)
                        setCodigoLlamada(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputTelefono}
                    defaultValue={datosFormulario.telefono}
                    onChange={(e) => onChange(e, "telefono")}
                    errorMessage={errorTelefono}
                /> 
            </View>
            <Input
                    placeholder="Descripción restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={datosFormulario.descripcion}
                    onChange={(e) => onChange(e, "descripcion")}
                    errorMessage={errorDescripcion}
                />
        </View>
    )
}

const valoresDefectoFormulario = () => {
    return {
        nombre:"",
        descripcion:"",
        telefono:"",
        direccion:"",
        pais:"AR",
        codigoInternacional:"54",
        email:""
    }
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
    },
    vistaImagen:{
        flexDirection:"row",
        marginHorizontal:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    }
})
