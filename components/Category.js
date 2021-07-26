import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import Categories from "components/data/categories";

const Category = ({ handlePress=function(){}, styles, isDarkMode, iconSize=40, fontSize=18 }) => {

    return (
        <>
            {
                Categories.map( (cat, id) => (
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
