import { SET_LISTADO_PERSONAJES,SET_LISTADO_FAVORITOS } from "./PersonajeTypes";

const initialState = {
  listadoPersonajes: false,
  listadoPersonajesFavoritos:[]
};
const personajesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTADO_PERSONAJES: {
      state.listadoPersonajes=action.payload.personajes
      return { ...state };
    }
    case SET_LISTADO_FAVORITOS: {
      state.listadoPersonajesFavoritos=action.payload.personajes
      return { ...state };
    }
    default:
      return state;
  }
};

export default personajesReducer;
