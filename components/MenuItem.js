import React from "react";
import {
    TouchableOpacity,
} from "react-native";

import { Icon } from "react-native-elements";


const MenuItem = ({ navigation }) => {
    return (
        <TouchableOpacity 
            onPress={ () => navigation.toggleDrawer() } 
            style={{ 
                position: "absolute", 
                right: 10, 
                top: 10, 
                width: 50, 
                height: 50, 
                zIndex: 100
            }}
        >
            <Icon name="menu" color="#fff" size={ 50 } />
        </TouchableOpacity>
    )
}

export default MenuItem
