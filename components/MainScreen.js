import React from "react";
import { Text, View, ScrollView, useColorScheme, ImageBackground, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";

import * as styles from "components/css";

import Category from 'components/Category';
import RecomendedPlaces from "components/RecomendedPlaces";
import SearchMain from 'components/SearchMain';

const MainScreen = ({ navigation }) => {
   const isDarkMode = useColorScheme() === 'dark';
   const [ searched, setSearched ] = React.useState("");

   const onSearch = (input) => {
      setSearched(input);
   }
   const onLikeRecomended = (id) => {
      console.log(`Liked ${id}`);
   }
   const goMenu = () => {
      console.log("OK!");
      navigation.navigate("Menu");
   }

   return (
      <>
         <ImageBackground source={ require('src/bg2.jpg') } style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
            <TouchableOpacity onPress={ () => goMenu() } style={{ position: "absolute", right: 10, top: 10, zIndex: 4, width: 50, height: 50, zIndex: 100 }}>
               <Icon name="menu" color="#fff" size={ 50 } />
            </TouchableOpacity>
            <View style={ styles.logoContainer } >
               <View >
                  <Icon name="place" type="material" size={ 40 } color={ isDarkMode? "#3F3F3F": styles.StaticText.color } />
               </View>
               <View style={{ marginLeft: 10 }} >
                  <Text style={{ color: isDarkMode? "#3F3F3F": styles.StaticText.color, fontFamily: "Rancho-Regular", fontSize: 30}}>Lubuskie</Text>
                  <Text style={{ color: isDarkMode? "#3F3F3F": styles.StaticText.color, fontFamily: "Rancho-Regular", fontSize: 20, marginLeft: 30}}>bez granic</Text>
               </View>
            </View>

            <SearchMain styles={ styles } isDarkMode={ isDarkMode } onSearch={ onSearch } />

            <View style={{
               marginTop: 20,
               width: "85%"
            }}>
               <Text style={{ fontSize: 25, color: isDarkMode? "#fff": styles.StaticText.color }}>Kategorie miejsc</Text>

               <ScrollView horizontal={ true } style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                  <Category styles={ styles } isDarkMode={ isDarkMode } />
               </ScrollView>
            </View>
            <View style={{ marginTop: 20, width: "80%" }} >
               <Text style={{ fontSize: 25, color: isDarkMode? "#fff": styles.StaticText.color }}>Polecane miejsca</Text>

               <ScrollView horizontal={ true } style={{ margin: 10 }} >
                  <RecomendedPlaces onLikeRecomended={ onLikeRecomended } />
               </ScrollView>
            </View>
         </ImageBackground>
      </>
   )
}

export default MainScreen;
