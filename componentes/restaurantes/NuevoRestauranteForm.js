import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions, Text, View, ScrollView, Alert } from 'react-native'
import { Input,Button, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import MapView from 'react-native-maps'

import { buscarLocalizacionUsuario, importarImagenGaleria, validateEmail } from '../../utilidades/helpers'
import Modal from '../../componentes/Modal'

const widthScreen = Dimensions.get("window").width

export default function NuevoRestauranteForm({toastRef, setCargando, navigation}) {
    const [datosFormulario, setDatosFormulario] = useState(valoresDefectoFormulario())
    const [errorNombre, setErrorNombre] = useState(null)
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorTelefono, setErrorTelefono] = useState(null)
    const [errorDireccion, setErrorDireccion] = useState(null)
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([])
    const [esVisibleEnMapa, setEsVisibleEnMapa] = useState(false)
    const [localizacionRestaurante, setLocalizacionRestaurante] = useState(null)

    const agregarRestaurante = () => {
        if(!validarFormulario()){
            return
        }

        console.log(datosFormulario)
    }
    
    const validarFormulario = () => {
        limpiarErrores()
        let esValido = true

        if(isEmpty(datosFormulario.nombre)){
            setErrorNombre("Debes ingresar el nombre del restaurante.")
            esValido = false
        }

        if(isEmpty(datosFormulario.direccion)){
            setErrorDireccion("Debes ingresar la dirección del restaurante.")
            esValido = false
        }

        if(size(datosFormulario.telefono) < 10){
            setErrorTelefono("Debes ingresar el teléfono del restaurante.")
            esValido = false
        }

        if(isEmpty(datosFormulario.descripcion)){
            setErrorDescripcion("Debes ingresar la descripción del restaurante.")
            esValido = false
        }

        if(!validateEmail(datosFormulario.email)){
            setErrorEmail("Debes ingresar un email válido del restaurante.")
            esValido = false
        }

        if(!localizacionRestaurante){
            toastRef.current.show("Debes localizar el restaurante en el mapa.", 3000)
            esValido = false
        }else if(size(imagenesSeleccionadas) === 0){
            toastRef.current.show("Debes agregar al menos una imagen al restaurante.", 3000)
            esValido = false
        }
        return esValido
    }

    const limpiarErrores = () => {
        setErrorNombre(null)
        setErrorDireccion(null)
        setErrorTelefono(null)
        setErrorDescripcion(null)
        setErrorEmail(null)
    }

    return (
        <ScrollView style={styles.vistaContenedora}>
            <ImagenRestaurante 
                imagenRestaurante={imagenesSeleccionadas[0]}
            />
            <AgregarFormulario
                datosFormulario={datosFormulario}
                setDatosFormulario={setDatosFormulario}
                errorNombre={errorNombre}
                errorDescripcion={errorDescripcion}
                errorEmail={errorEmail}
                errorTelefono={errorTelefono}
                errorDireccion={errorDireccion}
                setEsVisibleEnMapa={setEsVisibleEnMapa}
                localizacionRestaurante={localizacionRestaurante}
            />
            <SubirImagen
                toastRef={toastRef}
                imagenesSeleccionadas={imagenesSeleccionadas}
                setImagenesSeleccionadas={setImagenesSeleccionadas}
            />
            <Button 
                title="Crear Restaurante"
                onPress={agregarRestaurante}
                buttonStyle={styles.btnAgregarRestaurante}
            />
            <MapaRestaurante 
                esVisibleEnMapa={esVisibleEnMapa}
                setEsVisibleEnMapa={setEsVisibleEnMapa}
                setLocalizacionRestaurante={setLocalizacionRestaurante}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapaRestaurante({esVisibleEnMapa, setEsVisibleEnMapa, setLocalizacionRestaurante, toastRef}){

    const [nuevaRegion, setNuevaRegion] = useState(null)

    useEffect(() => {
        (async() => {
            const respuesta = await buscarLocalizacionUsuario()
            if(respuesta.status){
                setNuevaRegion(respuesta.location)
            }
        })()
    },[])


const confirmarLocalizacion = () => {
    setLocalizacionRestaurante(nuevaRegion)
    toastRef.current.show("Localización guardada correctamente.", 3000)
    setEsVisibleEnMapa(false)
}

    return (
        <Modal isVisible={esVisibleEnMapa} setMostrarModal={setEsVisibleEnMapa}>
            <View>
                {
                    nuevaRegion && (
                        <MapView
                            style={styles.estiloMapa}
                            initialRegion={nuevaRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNuevaRegion(region)}
                        >
                            <MapView.Marker 
                                coordinate={{
                                    latitude: nuevaRegion.latitude,
                                    longitude: nuevaRegion.longitude
                                }}
                                draggable
                            />
                         
                        </MapView>
                    ) 
              
                }
                
                <View style={styles.botonesMapa}>
                    <Button
                        title="Guardar Ubicación"
                        containerStyle={styles.contenedorBtnGuardarUbicacion}
                        buttonStyle={styles.btnGuardarUbicacion}
                        onPress={() => confirmarLocalizacion()}
                    />
                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.contenedorBtnCancelarUbicacion}
                        buttonStyle={styles.btnCancelarUbicacion}
                        onPress={()=> setEsVisibleEnMapa(false)}
                    />
                </View>
                
            </View>
        </Modal>
    )
}

function ImagenRestaurante({imagenRestaurante}){
    return (
        <View style={styles.vistaFoto}>
            <Image
                style={{width:widthScreen, height:200}}
                source={
                    imagenRestaurante ? {uri: imagenRestaurante} : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function SubirImagen({toastRef,imagenesSeleccionadas,setImagenesSeleccionadas}){
    const imagenSeleccionada = async() => {
        const response = await importarImagenGaleria([4,3])
        if(!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagenesSeleccionadas([...imagenesSeleccionadas, response.image])
    }

    const eliminarImagen = (imagenEliminar) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estás seguro de eliminar la imagen?",
            [
                {
                    text:"No",
                    style:"cancel"
                },
                {
                    text:"Si",
                    onPress:() => {
                        setImagenesSeleccionadas(
                            filter(imagenesSeleccionadas, (imageUrl) => imageUrl !== imagenEliminar)
                        )
                    }
                }
            ],
            {
                cancelable:true
            }
        )    
    }
    

    return(
        <ScrollView
            horizontal
            style={styles.vistaImagen}
        >
            {
                size(imagenesSeleccionadas) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imagenSeleccionada}
                    />
                )
            }
            {
                map(imagenesSeleccionadas, (imagenRestaurante, index) => (
                   
                    <Avatar
                        key={index}
                        style={styles.miniatura}
                        source={{uri: imagenRestaurante}}
                        onPress={() => eliminarImagen(imagenRestaurante)}
                    />
                   
                ))
            }
        </ScrollView>
    )
}

function AgregarFormulario({datosFormulario,setDatosFormulario,errorNombre,errorDescripcion,errorEmail,errorTelefono,errorDireccion,setEsVisibleEnMapa,localizacionRestaurante}) {
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
                rightIcon={{
                    type:"material-community",
                    name:"google-maps",
                    color: localizacionRestaurante ? "#639443" : "#c2c2c2" ,
                    onPress: () => setEsVisibleEnMapa(true)
                }}
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
    },
    miniatura:{
        width:70,
        height:70,
        marginRight:10
    },
    vistaFoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    },
    estiloMapa:{
        width:"100%",
        height: 550
    },
    botonesMapa:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10
    },
    contenedorBtnGuardarUbicacion:{
        paddingRight:5
    },
    btnGuardarUbicacion:{
        backgroundColor:"#639443"
    },
    contenedorBtnCancelarUbicacion:{
        paddingLeft:5
    },
    btnCancelarUbicacion:{
        backgroundColor:"#d44932"
    }
})
