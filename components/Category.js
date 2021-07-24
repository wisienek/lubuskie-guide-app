import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const Category = ({ handlePress=function(){}, styles, isDarkMode, iconSize=40, fontSize=18 }) => {

    const categories = [
        {
            name: 'Miasto',
            color: '#C93283',
            icon: 'location-city'
        },
        {
            name: 'Szlaki',
            color: '#3F987D',
            icon: 'tent',
            type: 'fontisto'
        },
        {
            name: 'Z Wodą',
            color: '#546ECB',
            icon: 'pool'
        },
        {
            name: 'Historia',
            color: '#B17500',
            icon: 'history-edu'
        }
    ];

    return (
        <>
            {
                categories.map( (cat, id) => (
                    <TouchableOpacity onPress={ () => handlePress( cat.name ) } key={ `kat${id}` } style={ styles.categoryContainer }>
                        <View style={{ backgroundColor: cat.color, borderRadius: 100, padding: iconSize/2 }}>
                            <Icon name={ cat.icon } type={ cat.type || '' } size={ iconSize } color="#fff"/>
                        </View>
                        <Text style={{ color: isDarkMode? '#f3f3f3': styles.StaticText.color, fontSize }}>{ cat.name }</Text>
                    </TouchableOpacity>
                ))
            }
        </>

    )
}

export default Category;
