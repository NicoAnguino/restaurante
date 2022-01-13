import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { Alert } from 'react-native'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const importarImagenGaleria = async(array) =>{
    const response = {status:false, image:null}
    const resultadoPermisos = await Permissions.askAsync(Permissions.CAMERA)
    if(resultadoPermisos.status === "denied"){
        Alert.alert("Debes de darle permiso para acceder a las imágenes del teléfono.")
        return response
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:array
    })
    if(result.cancelled){
        return response
    }
    response.status = true
    response.image = result.uri
    return response
}

export const fileToBlob = async(path) =>{
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}

export const buscarLocalizacionUsuario = async() =>{
    const respuesta = {status:false, location:null}
    const resultadoPermisos = await Permissions.askAsync(Permissions.LOCATION)
    if(resultadoPermisos.status === "denied"){
        Alert.alert("Debes de darle permiso para acceder al mapa del teléfono.")
        return response
    }
    const posicion = await Location.getCurrentPositionAsync({})
    const location = {
        latitude:posicion.coords.latitude,
        longitude:posicion.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }
    respuesta.status = true
    respuesta.location = location
    return respuesta
}