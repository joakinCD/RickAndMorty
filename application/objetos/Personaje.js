import llamadasApi from "../funcionalidades/LlamadasApi";
export default class Personaje {
  id=0;
  name= "";
  status= "";
  species= "";
  type= "";
  gender= "";
  origin={
    "name": "",
    "url": ""
  };
  location= {
    "name": "",
    "url": ""
  };
  image= "";
  episode= [];
  url= "";
  episodiosCargados=[];
  favorito=false;
  constructor(obj) {
    this.id = obj.id || "";
    this.name=obj.name || "";
    this.status= obj.status || "";
    this.species= obj.species || "";
    this.type= obj.type || "";
    this.gender= obj.gender || "";
    this.origin= obj.origin || {
      "name": "",
      "url": ""
    },
    this.location= obj.location || {
      "name": "",
      "url": ""
    },
    this.image= obj.image || "";
    this.episode= obj.episode ||  [];
    this.url= obj.url || "";
    this.episodiosCargados=obj.episodiosCargados ||  [];
    this.favorito= obj.favorito || false
  }
  cargarEpisodios() {
    let personaje = this;

    return new Promise(async function (resolve, reject) {
      if(personaje.episodiosCargados.length>0){
        resolve(personaje.episodiosCargados)
      }else{
        let episodios=[]
        let indices=[]
        personaje.episode.map(function(item,index){
          let id = item.replace("https://rickandmortyapi.com/api/episode/", '')
          indices.push(id)
        })
        let result = await llamadasApi.getDatosEpisodios(indices)

        if(result.length){
          personaje.episodiosCargados=result
        }else{
          personaje.episodiosCargados=[result]
        }
        
        resolve(result)
      }
      
    });
  }
}
