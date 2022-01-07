import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

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

export const usuarioRegistrado = async(email, password) => {
    const resultado = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        resultado.error = "Este correo ya ha sido registrado."
    }
    return resultado
}
