import React from "react";
import { 
    View,
    TouchableOpacity,
    Text,
    Image
} from "react-native";

const MockToures = ({ navigation, Toures, main }) => {
    return (
        <>
            {
                Toures.map((tour, ind)=> (
                    <TouchableOpacity 
                        key={ `g-${ind}` }
                        onPress={()=> {
                            console.log(`Pressed ${tour.id}`);
                            navigation.navigate("Post", { tour });
                        }}
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
                    </TouchableOpacity>
                ))
            }
        </>
    )
}

export default MockToures;