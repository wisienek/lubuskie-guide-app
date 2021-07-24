import React from 'react';
import {
   StatusBar,
} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Icon } from "react-native-elements";
import * as styles from "components/css";

enableScreens();

import AllToures from 'components/AllToures';
import MainScreen from 'components/MainScreen';
import Menu from 'components/Menu';

import AsyncStorage from '@react-native-async-storage/async-storage';


const icons = {
   "Główna": {
      name: "map",
      type: "material"
   },
   "Wszystkie Miejsca" : {
      name: "find-replace",
      type: "materialIcons"
   }
}


const Drawer = createDrawerNavigator();

const App = () => {
   return (
      <NavigationContainer>
         <Drawer.Navigator 
            drawerPosition="right"
            initialRouteName="Główna"
            drawerType="front"
            edgeWidth={ 70 }
            drawerContent={ Menu }
            screenOptions={ ({ route }) => ({
               drawerIcon: ({  }) => (
                  <Icon name={ icons[ route.name ].name } type={ icons[ route.name ].type } size={ 40 } color={ "#EAEAEA" } />
               )
            })}
         >
            <Drawer.Screen name="Główna" component={ MainScreen } />
            <Drawer.Screen name="Wszystkie Miejsca" component={ AllToures } />
         </Drawer.Navigator>
      </NavigationContainer>
   );
};

// options={{ drawerIcon: ( <Icon name="map" type="material" size={ 40 } color={ isDarkMode? "#3F3F3F": styles.StaticText.color } /> ) }} 

export default App;