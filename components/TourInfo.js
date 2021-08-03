import React from "react";

import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageBackground
} from "react-native";

import LottieView from 'lottie-react-native';

import { Context } from "./context/LikedContext";
import * as TI from "./data/MockTouresInfo.json";

import MenuItem from "components/MenuItem";
import Dissabilities from "components/Dissabilities";

const styles = StyleSheet.create({
    category : {
        fontSize: 18,
        marginRight: 10,
        color: 'black'
    },
    selectedCat : {
        color: "#BA0000",
        fontSize: 18,
        marginRight: 10
    }
});

const categories = ["Trasa", "Informacje", "Wydarzenia", "Warto Zobaczyć"];
const SelectedCategory = ({ selected="Trasa" }) => {

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
                    <View key={ `cat-${i}` }>
                        <Text style={ selected === cat ? styles.selectedCat : styles.category } >{ cat }</Text>
                        {
                            selected === cat?
                                <View style={{ width: 10, height: 10, borderRadius: 50, color: '#BA0000' }} />
                            :null
                        }
                    </View>
                ))
            }
        </ScrollView>
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

        console.log(id, liked);
    }
    const switchCat = ( cat ) => setSelectedCat( cat );


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
        <View>
            <View 
                style={{
                    width: "100%",
                    height: "30%",
                    backgroundColor: 'rgba(0,0,0, 1)'
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

            <ScrollView
                style={{
                    padding: 20,
                    marginTop: -50,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    height: "100%"
                }}
            >
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
                            <Text style={{ fontSize: 16 }}> km długości</Text>
                        </View>)
                    :null
                }


                <SelectedCategory selected={ selectedCat } />

                {
                    current?.Galeria?
                        <ScrollView 
                            horizontal={ true }
                            style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                            {
                                current.Galeria.map( (foto, i)=> (
                                    <Image source={{ uri: foto }} style={{ width: 100, height: 180 }} />
                                ))
                            }
                        </ScrollView>
                    :null
                }

            </ScrollView>
        </View>
    );
}

export default TourInfo;