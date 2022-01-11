
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Icon } from 'react-native-elements/dist/icons/Icon'
import RestaurantesStack from './RestaurantesStack'
import FavoritosStack from './FavoritosStack'
import TopRestaurantesStack from './TopRestaurantesStack'
import BuscarStack from './BuscarStack'
 import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {

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
                    component={RestaurantesStack}
                    options={{title:"Restaurantes"}}
                />
                  <Tab.Screen 
                    name="favoritos"
                    component={FavoritosStack}
                    options={{title:"Favoritos"}}
                />
                  <Tab.Screen 
                    name="top-restaurantes"
                    component={TopRestaurantesStack}
                    options={{title:"Top 5"}}
                />
                  <Tab.Screen 
                    name="buscar"
                    component={BuscarStack}
                    options={{title:"Buscar"}}
                />
                  <Tab.Screen 
                    name="account"
                    component={AccountStack}
                    options={{title:"Cuenta"}}
                />
           </Tab.Navigator>
       </NavigationContainer>
    )
}
