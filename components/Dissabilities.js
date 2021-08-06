import React from "react";

import { 
    View
} from 'react-native';

import { Icon } from "react-native-elements";

const icons = [ "hard-of-hearing", "eye", "wheelchair" ];

const Dissabilities = ({ ar }) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            { 
                ar.map( (a, i) => (
                    <View key={ `i-${i}`} style={{ marginRight: 5 }} >
                        {
                            a === 1 && <Icon name={ icons[i] } type="font-awesome" size={ 20 } />
                        }
                    </View>
                )) 
            }
        </View>
    )
}

export default Dissabilities;
