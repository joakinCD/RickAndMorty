import { createStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducer";
const thunkMiddleware = require("redux-thunk").thunk;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
