
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Restaurantes from '../screens/Restaurantes'
import Favoritos from '../screens/Favoritos'
import TopRestaurantes from '../screens/TopRestaurantes'
import Buscar from '../screens/Buscar'
import Account from '../screens/account/Account'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const Tab = createBottomTabNavigator()

export default function Navegacion() {

    const screenOptions = (route, color) => {
        let nombreIcono 
        switch (route.name) {
            case "restaurantes":
                nombreIcono = "compass-outline"
                break;
            case "favoritos":
                nombreIcono = "heart-outline"
                break;
            case "top-restaurantes":
                nombreIcono = "star-outline"
                break;
            case "buscar":
                nombreIcono = "magnify"
                break;
            case "account":
                nombreIcono = "home-outline"
                break;
        }

        return (
            <Icon 
                type='material-community'
                name={nombreIcono}
                size={22}
                color={color}
            />
        )
    }

    return (       
       <NavigationContainer>
           <Tab.Navigator
                initialRouteName='restaurantes'
                tabBarOptions={{
                    inactiveTintColor: "#e8bca4",
                    activeTintColor: "#d11f0d"
                }}
                screenOptions={({route}) => ({
                    tabBarIcon: ({color}) => screenOptions(route, color)
                })}
           >
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
