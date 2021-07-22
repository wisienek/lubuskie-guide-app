import React from 'react';
import {
   SafeAreaView,
   StatusBar,
   useColorScheme,
} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

enableScreens();

import MainScreen from 'components/MainScreen';
import Menu from 'components/Menu';


const Colors = {
   white: "#fff",
   black: "#000",
   light: "#C0C0C0",
   lighter: "#DCDCDC",
   dark: "#202020",
   darker: "#101010"
}

const Drawer = createDrawerNavigator();

const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

   return (
      <NavigationContainer>
         <Drawer.Navigator 
            drawerPosition="right"
            initialRouteName="Home"
            drawerType="front"
            edgeWidth={ 200 }
         >
            <Drawer.Screen name="Home" component={ MainScreen } />
            <Drawer.Screen name="Menu" component={ Menu } />
         </Drawer.Navigator>
      </NavigationContainer>
   );
};

export default App;