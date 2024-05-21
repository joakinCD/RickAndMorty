import { useState, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "../../assets/styles/styles";
import { StatusBar } from "expo-status-bar";
import Fontisto from '@expo/vector-icons/Fontisto';
import { connect } from "react-redux";
import { setListadoPersonajesFavoritos } from "../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = (props) => {
  const [personajesCargados, setPersonajesCargados] = useState(false);
  async function cargarPersonajesFavoritos(){
    let listadoFavoritos = await AsyncStorage.getItem("@listadoFavoritos");
    if(listadoFavoritos){
      listadoFavoritos = await JSON.parse(listadoFavoritos);
      props.setListadoPersonajesFavoritos(listadoFavoritos)
    }
    setPersonajesCargados(true)

  }
  useEffect(() => {
    cargarPersonajesFavoritos()
  }, []);
  useEffect(() => {
    if (personajesCargados) {
      cargarSiguienteScreen();
    }
  }, [personajesCargados]);
  function cargarSiguienteScreen() {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "vistaPrincipal" }],
    });
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.image,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Fontisto name="persons" size={150} color="black" />
        </Animated.View>
      </View>
      <StatusBar style="light" animated={true} />
    </View>
  );
};
const mapDispatchToProps = {
  setListadoPersonajesFavoritos
};
export default connect(null, mapDispatchToProps)(SplashScreen);
