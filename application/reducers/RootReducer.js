import { combineReducers } from "redux";

import personajesReducer from "./personaje/PersonajeReducer";

const rootReducer = combineReducers({
  personajes: personajesReducer
});

export default rootReducer;
