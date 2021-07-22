import React from "react";
import { View, Text } from "react-native";
import { Icon } from 'react-native-elements';

const Category = ({ styles, isDarkMode }) => {
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
                    <View key={ `kat${id}` } style={ styles.categoryContainer }>
                        <View style={{ backgroundColor: cat.color, borderRadius: 100, padding: 20 }}>
                            <Icon name={ cat.icon } type={ cat.type || '' } size={ 40 } color="#fff"/>
                        </View>
                        <Text style={{ color: isDarkMode? '#f3f3f3': styles.StaticText.color, fontSize: 18 }}>{ cat.name }</Text>
                    </View>
                ))
            }
        </>

    )
}

export default Category;
