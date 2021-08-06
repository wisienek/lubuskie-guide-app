import React from "react";

import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    TouchableWithoutFeedback,
    Alert
} from "react-native";

import { Icon } from "react-native-elements";

import LottieView from 'lottie-react-native';

import { Context } from "./context/LikedContext";
import * as TI from "./data/MockTouresInfo.json";
import MockToures from "./data/MockToures.json";

import MenuItem from "components/MenuItem";
import Dissabilities from "components/Dissabilities";


const styles = StyleSheet.create({
    category : {
        fontSize: 18,
        marginRight: 10,
        color: 'black',
        fontFamily: 'Adamina-Regular'
    },
    selectedCat : {
        color: "#BA0000",
        fontSize: 18,
        marginRight: 10,
        fontFamily: 'Adamina-Regular'
    },
    tourText: {
        fontSize: 18,
        color: 'black'
    },
    tourNav: {
        width: "100%", 
        height: 70, 
        display: 'flex', 
        flexDirection: 'row',
        marginTop: 'auto'
    },
    tourNavItem: {
        width: "33.33%", 
        height: "100%", 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

const categories = ["Trasa", "Informacje", "Wydarzenia", "Warto Zobaczyć"];
const SelectedCategory = ({ selected="Trasa", switchCat }) => {
    return (
        <ScrollView
            horizontal={ true }
            style={{
                display: 'flex', 
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
            }}
        >
            {
                categories.map( (cat, i) => (
                    <TouchableWithoutFeedback onPress={ ()=> switchCat( cat ) } key={ `cat-${i}` } >
                        <View style={{ alignItems: 'center', height: 55, marginRight: 5 }} >
                            <Text style={ selected === cat ? styles.selectedCat : styles.category } >{ cat }</Text>
                            {
                                selected === cat ?
                                    <View style={{ width: 10, height: 10, borderRadius: 20, backgroundColor: '#BA0000' }} />
                                :null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView>
    )
}

const TourContent = ({ selected="Trasa", current={} }) => {
    const getContent = () => {
        switch (selected) {
            case "Trasa": case "Wydarzenia": case "Warto Zobaczyć": {
                return (
                    current[ selected ]?
                        current[ selected ].map((t,i) => (
                            <Text key={`t-${i}`} style={ styles.tourText }>- { t } </Text>
                        ))
                    :null
                )
            }
            case "Informacje": {
                return (
                    current?.Informacje?
                        <Text style={{ fontSize: 16 }} >{ current.Informacje }</Text>
                    :null
                )
            }
        }
    }

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 24, fontFamily: 'Adamina-Regular' }}>{ selected }:</Text>
            {
                getContent()
            }
        </View>
    )
}

const Controlls = ({ navigation, current, swtichPost }) => {
    return (
        <View style={ styles.tourNav }>
            <TouchableOpacity onPress={ ()=> swtichPost( current.prev ) } style={{ ...styles.tourNavItem, backgroundColor: '#E9AEAE' }}>
                <Icon name="arrow-left" type="simple-line-icons" color="white" size={ 27 } />
                <Text style={{ color: "white", fontSize: 18 }}>Poprzedni</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ ()=> navigation.navigate("Wszystkie Miejsca") } style={{ ...styles.tourNavItem, backgroundColor: '#D2D985' }}>
                <Icon name="menu-book" type="material-icons" color="white" size={ 27 } />
                <Text style={{ color: "white", fontSize: 18 }}>Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ ()=> swtichPost( current.next ) } style={{ ...styles.tourNavItem, backgroundColor: '#7BD399' }}>
                <Text style={{ color: "white", fontSize: 18 }}>Następny</Text>
                <Icon name="arrow-right" type="simple-line-icons" color="white" size={ 27 } />
            </TouchableOpacity>
        </View>
    )
}


const TourInfo = ({ navigation, route }) => {
    const [ liked, toggleLiked ]  = React.useContext(Context);
    const [ current, setCurrent ] = React.useState( TI[ route?.params?.tour?.id ] || {} );
    const [ selectedCat, setSelectedCat ] = React.useState( "Trasa" );

    const animationRef = React.useRef(null);
    const first = React.useRef(true);

    const likePost = () => {
        let id = route?.params?.tour?.id;

        if( id )
            toggleLiked( id );

        // console.log(id, liked);
    }
    const switchCat = ( cat ) => setSelectedCat( cat );

    const swtichPost = ( id ) => {
        if( !id ) return;
        const found = MockToures.find( tour=> tour.id === id );
        if( !found )
            return Alert.alert("Błąd", `Wystąpił błąd podczas ładowania ścieżki (${id})`);

        route.params.tour = found;
        if( !TI[ id ] )
            return Alert.alert("Błąd", `Nie znaleziono informacji dla ścieżki (${id})`);

        setCurrent( TI[ id ] );
        navigation.navigate('Post', { tour: found });
    }


    React.useEffect(()=>{
        let isLiked = liked.indexOf( route.params.tour.id ) > -1 ? true : false;

        if( first.current === true ) {
            if( isLiked ) {
                animationRef.current.play(66, 66);
            } else {
                animationRef.current.play(19, 19);
            }

            first.current = false;
        } else if( isLiked ) {
            animationRef.current.play(19, 50);
        } else {
            animationRef.current.play(0, 19);
        }

        if( route.params.tour.id != current?.id )
            setCurrent( TI[ route.params.tour.id ] );
        
    }, [ route?.params?.tour, liked ]);

    return (
        < >
            <View 
                style={{
                    width: "100%",
                    height: "30%",
                    backgroundColor: 'rgba(0,0,0, 1)',
                }}
            >
                <TouchableOpacity 
                    style={{ 
                        position: 'absolute', 
                        left: 10, 
                        top: 10, 
                        backgroundColor: '#fff', 
                        zIndex: 100,
                        borderRadius: 100 
                    }} 
                    onPress={ () => likePost() }
                >
                    <LottieView 
                        ref={ animationRef }
                        style={{
                            width: 60,
                            height: 60
                        }}
                        autoPlay={ false }
                        loop={ false }
                        source={ require('./animated/likeAnimation.json') }
                    />
                </TouchableOpacity>

                <MenuItem navigation={ navigation } />
                
                <ImageBackground
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    source={{
                        uri: route.params.tour.img,
                        width: "100%",
                        height: "100%"
                    }}
                />
            </View>
            <>
                <ScrollView
                    style={{
                        marginTop: -50,
                        borderRadius: 40,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: 'white',
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ScrollView style={{
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingLeft: 30,
                        paddingRight: 30
                    }}>

                        <View 
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Text style={{ fontSize: 19, fontWeight: "bold" }} >
                                {
                                    route?.params?.tour?.place || "Błąd"
                                }
                            </Text>
                            {
                                current?.dla?
                                    <Dissabilities ar={ current.dla } />
                                :null
                            }
                        </View>
                        {
                            route?.params?.tour?.aprox?
                                (<View style={{ display: 'flex', flexDirection: "row" }} >
                                    <Text style={{ marginLeft: 10, color: 'red', fontSize: 16 }}>{ route?.params?.tour?.aprox }</Text> 
                                    <Text style={{ fontSize: 16 }}> km długości { route?.params?.tour?.commune? ` | ${route.params.tour.commune}`: "" }</Text>
                                </View>)
                            :null
                        }


                        <SelectedCategory selected={ selectedCat } switchCat={ switchCat } />

                        <TourContent selected={ selectedCat } current={ current } />

                        <Text style={{ marginTop: 20, fontSize: 24, fontFamily: 'Adamina-Regular' }}>Galeria</Text>
                        <ScrollView 
                            horizontal={ true }
                            style={{ marginBottom: 20 }}
                        >
                            {
                                current?.Galeria && current.Galeria.map( (foto, i)=> (
                                    <Image key={ `img-${i}` } source={{ uri: foto }} style={{ borderRadius: 10, width: 250, height: 300, marginTop: 10, marginBottom: 10, marginLeft: i>0? 10: 0 }} />
                                ))
                            }
                        </ScrollView>

                        <View>
                            <Text>
                                {
                                    current?.info || ""
                                }
                            </Text>
                        </View>
                    </ScrollView>
                    
                    <Controlls current={ route.params.tour } navigation={ navigation } swtichPost={ swtichPost } />
                </ScrollView>
            </>
        </>
    );
}

export default TourInfo;