import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Buscar from '../screens/Buscar'

const Stack = createStackNavigator()

export default function BuscarStack() {
    return (
       <Stack.Navigator>
           <Stack.Screen 
                name='buscar'
                component={Buscar}
                options={{title:"Buscar"}}
           />
       </Stack.Navigator>
    )
}
