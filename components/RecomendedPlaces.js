import React from 'react';
import { TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';

const RecomendedPlaces = ({ onLikeRecomended, isLiked, id }) => {
    const animationRef = React.useRef(null);
    const first = React.useRef(true);

    React.useEffect(()=>{
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
    }, [ isLiked ]);
    
    return (
        <>
            <View style={{ marginRight: 10, width: 200, height: 240, backgroundColor: '#C4C4C4', borderRadius: 20 }} >
                <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10, backgroundColor: '#fff', borderRadius: 100 }} onPress={ () => onLikeRecomended(id) }>
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
            </View>
        </>
    )
}

export default RecomendedPlaces;
