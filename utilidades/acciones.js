import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'
import { rest } from 'lodash'

const db = firebase.firestore(firebaseApp)

export const esUsuarioLogueado = () => {
    let estaLogueado = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (estaLogueado = true)
    })
    return estaLogueado
}

export const buscarUsuarioActual = () => {
    return firebase.auth().currentUser
}

export const cerrarSesion = () => {
    return firebase.auth().signOut()
}

export const registrarUsuario = async(email, password) => {
    const resultado = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        resultado.statusResponse = false
        resultado.error = "Este correo ya ha sido registrado."
    }
    return resultado
}

export const loguearUsuario = async(email, password) => {
    const resultado = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        resultado.statusResponse = false
        resultado.error = "Usuario o contraseña no válidos."
    }
    return resultado
}

export const subirImagen = async(imagen, path, name) =>{
    const resultado = { statusResponse: false, error:null, url:null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(imagen)
    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        resultado.statusResponse = true
        resultado.url = url
    } catch (error) {
        resultado.error = error
    }
    return resultado
}

export const actualizarPerfil = async(data) =>{
    const resultado =  { statusResponse: true, error:null}
    try {
        
    } catch (error) {
        resultado.error = error
    }
    return resultado
}