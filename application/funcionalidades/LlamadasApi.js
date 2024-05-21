async function getListadoPersonajes(pagina,name) {
  return new Promise(function (resolve, reject) {
    let filtroNombre = ''
    if(name){
      filtroNombre='&name='+name
    }
    var url="https://rickandmortyapi.com/api/character?page="+pagina+filtroNombre
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          resolve(response.json());
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.error("Error getListadoPersonajes -> ", error);
        reject(error);
      });
  });
}
async function getDatosEpisodios(params) {
  return new Promise(function (resolve, reject) {
    fetch('https://rickandmortyapi.com/api/episode/'+params, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          resolve(response.json());
        } else {
          reject();
        }
      })
      .catch((error) => {
        console.error("Error getDatosEpisodios -> ", error);
        reject(error);
      });
  });
}


export default { getListadoPersonajes,getDatosEpisodios};
