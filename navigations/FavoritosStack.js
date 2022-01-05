import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Favoritos from '../screens/Favoritos'

const Stack = createStackNavigator()

export default function FavoritosStack() {
    return (
       <Stack.Navigator>
           <Stack.Screen 
                name='favoritos'
                component={Favoritos}
                options={{title:"Favoritos"}}
           />
       </Stack.Navigator>
    )
}
