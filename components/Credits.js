import React from 'react';
import {
    Text,
    View,
    Linking
} from 'react-native';

const Credits = ({ navigation }) => {
    return (
        <View style={{ padding: 30 }}>
            <Text style={{
                fontSize: 28
            }}>
                Tutaj będzie strona z podziękowaniami za zasoby itp.
            </Text>
            <Text style={{ color: 'blue' }} onPress={ () => Linking.openURL('https://br.freepik.com/fotos/arvore') } >Zdjęcie tła: Árvore foto criado por wirestock - br.freepik.com</Text>
        </View>
    )
}

export default Credits;
