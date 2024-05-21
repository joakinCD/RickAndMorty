import { View,Image, Text, FlatList,ScrollView,Dimensions } from "react-native";
import { useEffect } from "react";
const height=Dimensions.get('window').height
const VistaDetallesPersonaje = (props) => {
  let personaje = props.route.params.personaje;
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle:personaje.name
    })
  }, []);

  return (
    <View style={{ flex: 1, padding: 15, background: "white" }}>
      <ScrollView style={{ width:'100%',height:height-100}}>
        
            <View
                style={{
                    width: '100%',
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 8,
                    }}
                    source={{ uri: personaje.image }}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "grey",
                    height: 1,
                    marginVertical: 10,
                }}
            ></View>
            <View style={{ paddingHorizontal: 10, width: "100%",flexDirection:'row' }}>
              <View style={{flex:1,alignItems:'flex-start'}}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {personaje.name}
                </Text>
                <Text style={{ fontSize: 16 }}>{personaje.species}</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end'}}>
                <Text style={{ fontSize: 16,}}>{personaje.status}</Text>
                <Text style={{ fontSize: 16 }}>{personaje.gender}</Text>
              </View>
            </View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "grey",
                    height: 1,
                    marginVertical: 10,
                }}
            ></View>
            <View style={{ paddingHorizontal: 10, width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Origen
                </Text>
                <Text style={{ fontSize: 16 }}>{personaje.origin.name}</Text>
            </View>
            <View style={{ paddingHorizontal: 10, width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Localización
                </Text>
                <Text style={{ fontSize: 16 }}>{personaje.location.name}</Text>
            </View>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "grey",
                    height: 1,
                    marginVertical: 10,
                }}
            ></View>
            <View style={{ paddingHorizontal: 10, width: "100%",flexDirection:'row',justifyContent:'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Episodios
                </Text>
                <Text style={{ fontSize: 16 }}>{personaje.episodiosCargados.length}</Text>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "grey",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, width:60 }}>
                Cap.
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, flex:1 }}>
                Nombre
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, width: 80 }}>
                Fecha
              </Text>
            </View>
            <FlatList
              style={{ width: "100%" }}
              data={personaje.episodiosCargados}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                let par = false;
                if (index % 2 == 0) {
                  par = true;
                }
                return (
                  <View
                    style={[
                      {
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "grey",
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      par
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "#DEDEDE" },
                    ]}
                  >
                    <Text style={{ fontSize: 16,width: 60}}>
                      {item.episode}
                    </Text>
                    <Text style={{ fontSize: 16, flex:1, color:'#327cbc'}}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, width: 80}}>
                      {item.air_date}
                    </Text>
                  </View>
                );
              }}
            />
      </ScrollView>
    </View>
  );
};

export default VistaDetallesPersonaje;
