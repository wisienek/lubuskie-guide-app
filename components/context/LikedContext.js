import React from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';


const LikedContext = ({ children }) => {
    const [ liked, setLiked ] = React.useState([]);

    const toggleLike = async ( id ) => {
        if( liked.indexOf(id) > -1 ){
            setLiked([ ...liked.filter(l=> l!=id) ]);
        } else {
            setLiked([ id, ...liked ]);
        }
        let added = await AsyncStorage.setItem('liked', JSON.stringify( liked ));
        return added;
    }

    React.useEffect( async () => {
        try{
            let storageLiked = await AsyncStorage.getItem("liked");
            if( storageLiked ){
                let likedSet = new Set( JSON.parse(storageLiked) )
                setLiked( [...likedSet] );
            }
        }
        catch(er){
            console.error(er);
        }
    }, []);

    return (
        <Context.Provider value={[ liked, toggleLike ]}>
            {children}
        </Context.Provider>
    )
}


export const Context = React.createContext(null);
export default LikedContext;
