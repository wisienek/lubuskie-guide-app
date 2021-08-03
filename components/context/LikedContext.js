import React from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';


const LikedContext = ({ children }) => {
    const [ liked, setLiked ] = React.useState([]);

    const toggleLike = async ( id ) => {
        let newLiked = [ ...liked ];

        if( liked.indexOf(id) > -1 ) newLiked = newLiked.filter( l=> l!=id );
        else  newLiked.push( id );

        setLiked( newLiked );
        let added = await AsyncStorage.setItem( 'liked', JSON.stringify( newLiked ) );
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
