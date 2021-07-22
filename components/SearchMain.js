import React from "react";
import { View, TextInput } from "react-native";
import { Icon } from "react-native-elements";

const SearchMain = ({ styles, isDarkMode, onSearch }) => {
    return (
        <>
            <View style={ styles.StaticText, styles.searchContainer }>
                <Icon name="search" size={ 35 } />
                <TextInput onChangeText={ (e) => onSearch(e) } placeholder="Szukaj" placeholderTextColor={isDarkMode? "#3F3F3F": styles.StaticText.color} style={{ color: isDarkMode? "#3F3F3F": styles.StaticText.color, marginLeft: 15, fontSize: 25, maxWidth: '80%' }}/>
            </View>
        </>
    )
}

export default SearchMain;
