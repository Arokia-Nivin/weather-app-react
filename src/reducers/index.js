import { combineReducers } from "redux";
import { weatherDataReducer } from "./weatherDataReducer";

const rootReducers = combineReducers({
    weatherData: weatherDataReducer
});

export default rootReducers;
