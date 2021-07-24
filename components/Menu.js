import React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from "react-native";

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import * as styles from "components/css";
import { Icon } from "react-native-elements";



const Menu = ( props ) => {

    return (
        <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#505050", height: "100%", width: "100%" }}>
            <View style={{ justifyContent: "center", width: "100%", alignItems: "center", display: "flex" }} >
                <View style={{ display: "flex", flexDirection: "row", color: "white", marginTop: 10, marginRight: 60 }} >
                    <View >
                        <Icon name="place" type="material" size={ 40 } color="white" />
                    </View>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{ color: "white", fontFamily: "Rancho-Regular", fontSize: 30}}>Lubuskie</Text>
                        <Text style={{ color: "white", fontFamily: "Rancho-Regular", fontSize: 20, marginLeft: 30}}>bez granic</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={ () => props.navigation.toggleDrawer() } style={{ position: "absolute", right: 10, top: 10, width: 50, height: 50, zIndex: 100 }}>
                    <Icon 
                        name="cross" 
                        type="entypo"
                        size={ 50 } 
                        color="white" 
                    />
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: "10%" }}>
                <DrawerItemList 
                    itemStyle={{ 
                        borderLeftWidth: 4,
                        borderColor: "#a1a1a1"
                    }} 
                    activeTintColor="white" 
                    inactiveTintColor="white"
                    { ...props } 
                />
            </View>
        </View>
    )
}

export default Menu;