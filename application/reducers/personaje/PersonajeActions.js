import { SET_LISTADO_PERSONAJES,SET_LISTADO_FAVORITOS } from "./PersonajeTypes";

export const setListadoPersonajes = (personajes) => {
  return (dispatch) => {
    dispatch({
      type: SET_LISTADO_PERSONAJES,
      payload: {
        personajes: personajes
      },
    });
  };
};
export const setListadoPersonajesFavoritos = (personajes) => {
  return (dispatch) => {
    dispatch({
      type: SET_LISTADO_FAVORITOS,
      payload: {
        personajes: personajes
      },
    });
  };
};


