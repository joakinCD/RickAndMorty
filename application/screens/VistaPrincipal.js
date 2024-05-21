import { useState,useEffect,useRef } from "react";
import { View, FlatList, TextInput, Pressable ,ScrollView,Dimensions,Text} from "react-native";
import { connect } from "react-redux";
import { setListadoPersonajes,setListadoPersonajesFavoritos } from "../reducers";
import llamadasApi from "../funcionalidades/LlamadasApi";
import PersonajeItem from "../components/PersonajeItem";
import Personaje from "../objetos/Personaje";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";

const height=Dimensions.get('window').height
let txtBuscador=''
let txtBuscadorFav=''

const VistaPrincipal = (props) => {
  
  const flatListRef = useRef()
  const [mostrarFavoritos,setMostrarFavoritos] = useState(false);
  const [paginaSel,setPaginaSel] = useState(1);
  const [textoBuscador, setTextoBuscador] = useState("");
  const [personajesBuscador, setPersonajesBuscador] = useState(
    props.listadoPersonajesFavoritos.slice(),
  );

  function updateSearch(textoBuscadorAux) {
    setTextoBuscador(textoBuscadorAux);
    if(!mostrarFavoritos){
      txtBuscador=textoBuscadorAux
      setPaginaSel(1)
      cargarPersonajes(paginaSel,textoBuscadorAux)
    }else{
      txtBuscadorFav=textoBuscadorAux
      if (txtBuscadorFav.length > 0) {
        var search = txtBuscadorFav.toUpperCase();
        const personajeFiltrados = props.listadoPersonajesFavoritos.filter((item) => {
          let name = item.name;
          return (
            name.toUpperCase().indexOf(search) > -1
          );
        });
        setPersonajesBuscador(personajeFiltrados.slice());
      } else {
        setPersonajesBuscador(props.listadoPersonajesFavoritos.slice());
      }
    }
  }
  function cargarPersonajes(pagina,textoBuscadorAux) {
      llamadasApi.getListadoPersonajes(pagina,textoBuscadorAux).then(
        function (result) {
          let personajes=[]
          result?.results.map(function(item,index){
            let favorito=false
            props.listadoPersonajesFavoritos.map(function(personaje,index){
              if(item.id==personaje.id){
                favorito=true
              }
            })
            item.favorito=favorito
            let personaje = new Personaje(item)
            personajes.push(personaje)
          })
          result.personajes=personajes
          props.setListadoPersonajes(result)

          flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        },
        function (err) {
          props.setListadoPersonajes(false)
        },
      );
    
  }
  function onPressFavoritos() {
    setMostrarFavoritos(!mostrarFavoritos)
    if(mostrarFavoritos){
      setTextoBuscador(txtBuscador);
    }else{
      setTextoBuscador(txtBuscadorFav)
    }
    
    
    
  }
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
            return (
              <Pressable onPress={onPressFavoritos} style={{height:'100%',width:24,justifyContent:'center',alignItems:'center',marginRight:20}}>
                {mostrarFavoritos?(
                    <AntDesign name="heart" size={24} color="#327cbc" />
                    ):(
                    <AntDesign name="hearto" size={24} color="#327cbc" />
                    )
                }
              </Pressable>
            );
          },
    })
  }, [mostrarFavoritos]);
  useEffect(() => {
    cargarPersonajes(1,'');
  }, []);
  function onPressIndice(indice){
    let paginaSel = indice+1
    setPaginaSel(paginaSel)
    cargarPersonajes(paginaSel,textoBuscador)
  }
  function abrirDetallesPersonaje(personaje) {
    personaje.cargarEpisodios().then(function(res){
      props.navigation.navigate("vistaDetalles", { personaje: personaje });
    })
  }
  function addFavorito(personaje) {
    let personajesFavoritosAux = props.listadoPersonajesFavoritos.slice();
    if(personaje.favorito){
      let indice=-1
      personajesFavoritosAux.map(function(item,index){
        if(item.id==personaje.id){
          indice=index
        }
      })
      if(indice!=-1){
        personajesFavoritosAux.splice(indice, 1);
      }
    }else{
      personajesFavoritosAux.push(personaje)
    }
    personaje.favorito=!personaje.favorito
    props.setListadoPersonajesFavoritos(personajesFavoritosAux)
    setPersonajesBuscador(personajesFavoritosAux)
    if(mostrarFavoritos){
      setTextoBuscador('')
    }
    txtBuscadorFav=''
    AsyncStorage.setItem(
      "@listadoFavoritos",
      JSON.stringify(personajesFavoritosAux),
    );
  }
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        background: "white"
      }}
    >
      <TextInput
          placeholder="Filtrar personaje..."
          onChangeText={(text) => updateSearch(text)}
          style={{ borderWidth: 1, borderRadius: 8, paddingLeft: 10 ,marginBottom:10,borderColor:'#327cbc'}}
          value={textoBuscador}
        />
      {
        props.listadoPersonajes && !mostrarFavoritos?(
        <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        > 

          <ScrollView horizontal={true} style={{flex:1,paddingBottom:4}}>
            <View style={{flexDirection:'row'}}>
              {
                [...new Array(props.listadoPersonajes.info.pages)].map((item, index) => <Pressable style={[{marginRight:5,width:20,height:20,borderWidth:1,borderRadius:8,justifyContent:'center',alignItems:'center',borderColor:'#327cbc'},(paginaSel-1)==index?{backgroundColor:'#327cbc'}:{backgroundColor:'white'}]} key={index} onPress={onPressIndice.bind(this,index)}><Text style={(paginaSel-1)==index?{color:'white'}:{color:'#327cbc'}}>{index+1}</Text></Pressable>)
              }
            </View>
          </ScrollView>
        </View>
        <FlatList
          ref={flatListRef}
          data={props.listadoPersonajes.personajes}
          style={{width:'100%',height:height-160}}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <PersonajeItem personaje={item} addFavorito={addFavorito} abrirDetallesPersonaje={abrirDetallesPersonaje}>{item.name}</PersonajeItem>
            );
          }}
        />
        </>
        ):(null)
      }
      {
        mostrarFavoritos?(
        <FlatList
          data={personajesBuscador}
          style={{width:'100%',height:height-160}}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <PersonajeItem personaje={item} addFavorito={addFavorito} abrirDetallesPersonaje={abrirDetallesPersonaje}>{item.name}</PersonajeItem>
            );
          }}
        />
        ):(null)
      }
      
    </View>
  );
};
/**/
const mapStateToProps = (state) => {
  return {
    listadoPersonajes: state.personajes.listadoPersonajes,
    listadoPersonajesFavoritos:state.personajes.listadoPersonajesFavoritos,
  };
};
const mapDispatchToProps = {
  setListadoPersonajes,
  setListadoPersonajesFavoritos
};
export default connect(mapStateToProps,mapDispatchToProps)(VistaPrincipal);
