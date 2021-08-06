import React from 'react';

import {
    Animated,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} from "react-native";

import * as styles from "components/css";
import Category from "components/Category";
import AIcon from "components/animated/AIcon";
import MockToures from "components/mock/MockToures";
import * as TI from "./data/MockTouresInfo.json";


import { Icon } from "react-native-elements";

// data
import { Context } from "./context/LikedContext";
import Toures from "components/data/MockToures";


const AnimatedIcon = Animated.createAnimatedComponent(AIcon);
    
const AllToures = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('screen');
    const textRef = React.useRef(null);

    const [ liked, ] = React.useContext(Context);
    const [ polubione, setPolubione ] = React.useState( (route?.params?.category && route?.params?.category === "Polubione" ) ? true : false );
    const [ visible, setVisible ] = React.useState( false );
    const [ searched, setSearched ] = React.useState( "" );
    const [ selectedCategories, setSelectedCategories ] = React.useState( route?.params?.category? [ route.params.category ] : [  ]);
    const [ filtered, setFiltered ] = React.useState(Toures);


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
        let ltext = text.toLowerCase();
        let newToures =  [...Toures];
        
        if( selectedCategories.length == 0 )
            newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(ltext) > -1);
        else {
            if( selectedCategories.indexOf("Polubione") > -1 )
                newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(ltext) > -1 && liked.indexOf(tour.id) > -1 && ( selectedCategories.length >1? (tour.categories || []).every(cat=> selectedCategories.indexOf(cat) > -1) : true ));
            else
                newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(ltext) > -1 && (tour.categories || []).every(cat=> selectedCategories.indexOf(cat) > -1));
        }

        setFiltered( newToures );
        setSearched( ltext );
    }
    
    const handlePress = ( name ) => {
        if( selectedCategories.indexOf( name ) > -1 || ( polubione && name === "Polubione" ) ) {
            let filteredCats = name === "Polubione"? [ ...selectedCategories ]: [ ...selectedCategories.filter(cat=> cat !== name) ];
            let newToures = [...Toures];

            if( filteredCats.length != 0 ){
                if( name === "Polubione" )
                    newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(searched) > -1 && liked.indexOf(tour.id) > -1 && ( filteredCats.length >1? filteredCats.every(cat=> (tour.categories || []).indexOf(cat) > -1) : true ));
                else
                    newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(searched) > -1 && filteredCats.every(cat=> (tour.categories || []).indexOf(cat) > -1));
            }
            else
                newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(searched) > -1);


            if( name === "Polubione") setPolubione(false);
            setFiltered( newToures );
            setSelectedCategories( filteredCats );
        }
        else{
            let filteredCats = name === "Polubione"? [ ...selectedCategories ]: [ name, ...selectedCategories ];
            let newToures = [...Toures];

            if( name === "Polubione" )
                newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(searched) > -1 && liked.indexOf(tour.id) > -1 && ( filteredCats.length >1? filteredCats.every(cat=> (tour.categories || []).indexOf(cat) > -1) : true ));
            else
                newToures = newToures.filter(tour=> tour.place.toLowerCase().indexOf(searched) > -1 && filteredCats.every(cat=> (tour.categories || []).indexOf(cat) > -1));


            if( name === "Polubione") setPolubione(true);
            setFiltered( newToures );
            setSelectedCategories( filteredCats );
        }
    }

    React.useEffect(()=>{
        if( route?.params?.category )
            handlePress( route.params.category );
    }, [route]);

    return (
        <SafeAreaView style={{ width, height, backgroundColor: "#E5E5E5" }} >
            <View style={{ backgroundColor: "white", zIndex: 10, elevation: 10, display: "flex", flexDirection: "row", alignItems: "center", padding: 15, color: "#3F3F3F", width }} >
                
                <TouchableWithoutFeedback onPress={ ()=> textRef.current.focus() } >
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "80%" }}>
                        <Icon name="search" size={ 35 } />
                        <TextInput 
                            ref={ textRef }
                            onChangeText={ (e) => filterSearched(e) } 
                            placeholder="Wyszukaj" 
                            placeholderTextColor="#3F3F3F" 
                            style={{ color: "#3F3F3F", marginLeft: 15, fontSize: 25, maxWidth: '75%' }}
                        />
                    </View>
                </TouchableWithoutFeedback>

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
                    <Category styles={ styles } isDarkMode={ false } iconSize={ 25 } fontSize={ 18 } handlePress={ handlePress } selected={ selectedCategories.concat( polubione? "Polubione" : [] ) } />
                </ScrollView>
            </Animated.View>

            <ScrollView style={{ marginTop: visible ? 90 : 0 }}>

                <MockToures Toures={ filtered } navigation={ navigation } touresInfo={ TI } />

            </ScrollView>
        </SafeAreaView>
    )
}

export default AllToures;
