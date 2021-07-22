import React from 'react';
import { View } from "react-native";
import { Icon } from "react-native-elements";



const RecomendedPlaces = ({ onLikeRecomended }) => {
    const d = new Array(10).fill();

    return (
        <>
            {
                d.map((k, id)=>(
                    <View key={`rec${id}`} style={{ marginRight: 10, width: 200, height: 240, backgroundColor: '#C4C4C4', borderRadius: 20 }} >
                        <View style={{ position: 'absolute', right: 10, bottom: 10, backgroundColor: '#fff', borderRadius: 100, padding: 5 }} onTouchStart={ () => onLikeRecomended(id) }>
                            <Icon name="heart-outlined" type="entypo" size={ 40 } color="red" />
                        </View>
                    </View>
                ))
            }
        </>
    )
}

export default RecomendedPlaces;
