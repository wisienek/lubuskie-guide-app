import React from "react";
import { 
   Text, 
   View, 
   ScrollView, 
   useColorScheme, 
   ImageBackground, 
   TouchableOpacity,
   SafeAreaView
} from "react-native";

import { 
   Alert,
   Dimensions, 
   TextInput,
   TouchableWithoutFeedback
} from "react-native";

import { Context } from "./context/LikedContext";

import Toures from "components/data/MockToures";


// style

import { Icon } from "react-native-elements";

import * as styles from "components/css";

import Category from 'components/Category';
import RecomendedPlaces from "components/RecomendedPlaces";
import MockToures from "components/mock/MockToures";
import MenuItem from "components/MenuItem";


const MainScreen = ({ navigation }) => {
   const [ searched, setSearched ] = React.useState("");
   const [ filtered, setFiltered ] = React.useState([ ...Toures ]);
   const [ liked, toggleLiked ]    = React.useContext(Context);
   const ref = React.useRef(null);

   const onSearch = (input) => {
      let ltext = input.toLowerCase();
      
      setFiltered( [...Toures.filter(tour=> tour.place.toLowerCase().indexOf(ltext) > -1 )] );
      setSearched( ltext );
   }

   const handlePress = ( name ) => {
      return navigation.navigate('Wszystkie Miejsca' , { category: name });
   }


   return (
      <SafeAreaView>
         <ImageBackground source={ require('src/bg2.jpg') } style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, display: "flex", alignItems: "center" }}>
            
            <MenuItem navigation={ navigation } />

            <View style={ styles.logoContainer } >
               <View >
                  <Icon name="place" type="material" size={ 40 } color={ "#3F3F3F" } />
               </View>
               <View style={{ marginLeft: 10 }} >
                  <Text style={{ color: "#3F3F3F", fontFamily: "Rancho-Regular", fontSize: 30}}>Lubuskie</Text>
                  <Text style={{ color: "#3F3F3F", fontFamily: "Rancho-Regular", fontSize: 20, marginLeft: 30}}>bez granic</Text>
               </View>
            </View>

            <TouchableWithoutFeedback onPress={ ()=> ref.current.focus() }>
               <View style={ styles.StaticText, styles.searchContainer }>
                     <Icon name="search" size={ 35 } />
                     <TextInput ref={ ref } onChangeText={ (e) => onSearch(e) } placeholder="Szukaj" placeholderTextColor={ "#3F3F3F" } style={{ color: "#3F3F3F", marginLeft: 15, fontSize: 25, maxWidth: '80%' }}/>
               </View>
            </TouchableWithoutFeedback>

            {
               searched.length > 0?
                  <>
                     <ScrollView 
                        showsVerticalScrollIndicator={ false }
                        style={{
                           marginTop: 20,
                           width: "85%",
                           maxHeight: "60%",
                           borderRadius: 20,
                           backgroundColor: "#c4c4c4",
                           paddingBottom: 20
                        }}
                     >
                        <MockToures Toures={ filtered } main={ true } />
                     </ScrollView>
                  </>
               :
               <>
                  <View style={{
                     marginTop: 20,
                     width: "85%"
                  }}>
                     <Text style={{ fontSize: 25, color: "#fff" }}>Kategorie miejsc</Text>

                     <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                        <Category styles={ styles } textColor="white" handlePress={ handlePress } />
                     </ScrollView>
                  </View>
                  <View style={{ marginTop: 20, width: "80%" }} >
                     <Text style={{ fontSize: 25, color: "#fff" }}>Polecane miejsca</Text>

                     <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } style={{ margin: 10 }} >
                        {
                           new Array(10).fill().map((t,id)=>(
                              <RecomendedPlaces 
                                 key={ `rec-${id}` } 
                                 id={id} 
                                 onLikeRecomended={ toggleLiked } 
                                 isLiked={ liked.indexOf(id) > -1 } 
                                 liked={ liked } 
                              />
                           ))
                        }
                     </ScrollView>
                  </View>
               </>
            }

         </ImageBackground>
      </SafeAreaView>
   )
}

export default MainScreen;
