import React from 'react';

import {
    Animated,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import * as styles from "components/css";
import Category from "components/Category";
import AIcon from "components/animated/AIcon";
import MockToures from "components/mock/MockToures";

import { Icon } from "react-native-elements";
import { Dimensions } from 'react-native';


const AnimatedIcon = Animated.createAnimatedComponent(AIcon);
    
const AllToures = ({ navigation }) => {
    const { width, height } = Dimensions.get('screen');

    const [ visible, setVisible ] = React.useState( false );
    const [ searched, setSearched ] = React.useState( "" );
    const rotateAnimation = React.useRef( new Animated.Value(0) ).current;
    const interPass = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0]
    });
    const interRotate = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });


    const toggleVisible = () => {
        setVisible(!visible);

        Animated.timing(rotateAnimation, {
            toValue: +!visible,
            duration: 250,
            useNativeDriver: false,
        }).start()
    }
    const filterSearched = ( text ) => {
        
    }
    const handlePress = ( name ) => {
        console.log(name);
    }

    return (
        <SafeAreaView style={{ width, height, backgroundColor: "#E5E5E5" }} >
            <View style={{ backgroundColor: "white", zIndex: 10, elevation: 10, display: "flex", flexDirection: "row", alignItems: "center", padding: 15, color: "#3F3F3F", width }} >
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "80%" }}>
                    <Icon name="search" size={ 35 } />
                    <TextInput 
                        onChangeText={ (e) => filterSearched(e) } 
                        placeholder="Wyszukaj" 
                        placeholderTextColor="#3F3F3F" 
                        style={{ color: "#3F3F3F", marginLeft: 15, fontSize: 25, maxWidth: '75%' }}
                    />
                </View>

                <TouchableOpacity onPress={ async () => toggleVisible() } style={{ width: "20%", zIndex: 15, elevation: 15 }}>
                    <AnimatedIcon 
                        name="dots-three-vertical" 
                        type="entypo" 
                        size={ 35 } 
                        style={{ transform: [{ rotate: interRotate }] }} 
                    />
                </TouchableOpacity>
            </View>
            <Animated.View 
                style={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center",
                    zIndex: 1, 
                    elevation: 1,
                    position: "absolute",
                    top: 90,
                    shadowColor: 'grey',
                    shadowOpacity: 1,
                    transform: [{ translateY: interPass }]
                }} 
            >
                <ScrollView 
                    horizontal={ true } 
                    showsHorizontalScrollIndicator={ false } 
                    style={{ padding: 10, display: 'flex', flexDirection: 'row', backgroundColor: "white" }}
                >
                    <Category styles={ styles } isDarkMode={ false } iconSize={ 25 } fontSize={ 18 } handlePress={ handlePress } />
                </ScrollView>
            </Animated.View>

            <ScrollView style={{ marginTop: visible ? 90 : 0 }}>

                <MockToures />

            </ScrollView>
        </SafeAreaView>
    )
}

export default AllToures;
