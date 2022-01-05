import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TopRestaurantes from '../screens/TopRestaurantes'

const Stack = createStackNavigator()

export default function TopRestaurantesStack() {
    return (
       <Stack.Navigator>
           <Stack.Screen 
                name='top-restaurantes'
                component={TopRestaurantes}
                options={{title:"Top 5"}}
           />
       </Stack.Navigator>
    )
}
