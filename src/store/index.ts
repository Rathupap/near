import { createStore } from "redux";
import { flowReducer } from "./reducer";

const store = createStore(flowReducer);

export default store;
