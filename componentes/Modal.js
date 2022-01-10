import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'


export default function Modal({isVisible, setMostrarModal, children}) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setMostrarModal(false)}
        >
            {
                children
            }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        width:"90%"
    }
})
