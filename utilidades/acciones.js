import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const esUsuarioLogueado = () => {
    let estaLogueado = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (estaLogueado = true)
    })
}