import React from "react";
import { 
    View,
    Text,
    Image
} from "react-native";

import Groups from "components/data/groups";

const MockToures = ({ Toures, main }) => {
    return (
        <>
            {
                Toures.map((tour, ind)=> (
                    <View 
                        key={ `g-${ind}` }
                        style={{
                            backgroundColor: main? "#bababa": 'white',
                            paddingBottom: 10,
                            paddingTop: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 20,
                            height: main? 120: 130,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Image 
                            source={{ uri: tour.img }} 
                            defaultSource={ require("components/data/img1.jpg") }
                            style={{
                                height: "100%",
                                width: "33%",
                                borderRadius: 20,
                                marginRight: 10
                            }}
                        />
                        <View style={{ display: 'flex', flexDirection: 'column', width: "66%", justifyContent: tour.parent? "center": "flex-start", alignItems: tour.parent? "center": "flex-start" }} >
                            <Text style={{ flexShrink: 1, fontSize: tour.parent? 22 : 18, textAlign: tour.parent? "center": 'auto' }} >
                                { tour.place }
                            </Text>
                                {
                                    tour.aprox?
                                    (<View style={{ display: 'flex', flexDirection: "row" }} >
                                        <Text style={{ marginLeft: 10, color: 'red' }}>{ tour.aprox }</Text> 
                                        <Text> km długości</Text>
                                    </View>)
                                    :null
                                }
                                {
                                    tour.commune?
                                        <Text style={{ color: "#595858" }}>{ tour.commune }</Text>
                                    :null
                                }
                        </View>
                    </View>
                ))
            }
        </>
    )
}

export default MockToures;