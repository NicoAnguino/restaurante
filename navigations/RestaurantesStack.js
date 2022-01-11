import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AgregarRestaurante from '../screens/Restaurantes/AgregarRestaurante'
import Restaurantes from '../screens/Restaurantes/Restaurantes'

const Stack = createStackNavigator()

export default function RestaurantesStack() {
    return (
       <Stack.Navigator>
           <Stack.Screen 
                name='restaurantes'
                component={Restaurantes}
                options={{title:"Restaurantes"}}
           />
           <Stack.Screen 
                name='agregar-restaurante'
                component={AgregarRestaurante}
                options={{title:"Crear Restaurante"}}
           />
       </Stack.Navigator>
    )
}
