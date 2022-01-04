
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Restaurantes from '../screens/Restaurantes'
import Favoritos from '../screens/Favoritos'
import TopRestaurantes from '../screens/TopRestaurantes'
import Buscar from '../screens/Buscar'
import Account from '../screens/Account'

const Tab = createBottomTabNavigator()

export default function Navegacion() {
    return (       
       <NavigationContainer>
           <Tab.Navigator>
                <Tab.Screen 
                    name="restaurantes"
                    component={Restaurantes}
                    options={{title:"Restaurantes"}}
                />
                  <Tab.Screen 
                    name="favoritos"
                    component={Favoritos}
                    options={{title:"Favoritos"}}
                />
                  <Tab.Screen 
                    name="top-restaurantes"
                    component={TopRestaurantes}
                    options={{title:"Top 5"}}
                />
                  <Tab.Screen 
                    name="buscar"
                    component={Buscar}
                    options={{title:"Buscar"}}
                />
                  <Tab.Screen 
                    name="account"
                    component={Account}
                    options={{title:"Cuenta"}}
                />
           </Tab.Navigator>
       </NavigationContainer>
    )
}
