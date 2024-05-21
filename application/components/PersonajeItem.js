import { Image, Pressable, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState} from "react";

const PersonajeItem = (props) => {
    const { personaje, abrirDetallesPersonaje,addFavorito } = props;
    function onPressItem() {
        abrirDetallesPersonaje(personaje);
    }
    function onPressFav() {

        addFavorito(personaje)
    }
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <Pressable
                style={{width: '100%',flexDirection:'row'}}
                onPress={onPressItem}
            >
                <View style={{flex:1,flexDirection:'row'}}>
                    <View
                        style={{
                            width: 50,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Image
                            style={{
                                width: "100%",
                                height: 50,
                                borderRadius: 50,
                            }}
                            source={{ uri: personaje.image }}
                        />
                    </View>
                    <View
                        style={{
                            padding: 10,
                            flex:1
                            
                        }}
                    >
                        <Text
                            ellipsizeMode={"tail"}
                            numberOfLines={2}
                            style={{
                                fontSize: 16,
                                fontWeight: "bold"
                            }}
                        >
                            {personaje.name+' '}
                            <Text
                                style={{
                                    color: "grey"
                                }}
                            >
                                ({personaje.species})
                            </Text>
                        </Text>
                        <Text
                            ellipsizeMode={"tail"}
                            numberOfLines={2}
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "grey"
                            }}
                        >
                            {personaje.location.name}
                        </Text>
                    </View>
                </View>
                <Pressable onPress={onPressFav} style={{height:'100%',width:24,justifyContent:'center',alignItems:'center',marginRight:7}}>
                    {personaje.favorito?(
                        <AntDesign name="heart" size={24} color="#327cbc" />
                        ):(
                        <AntDesign name="hearto" size={24} color="#327cbc" />
                        )
                    }
                </Pressable>
            </Pressable>
        </View>
    );
};
export default PersonajeItem;
