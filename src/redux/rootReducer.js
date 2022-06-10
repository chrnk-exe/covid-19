import { combineReducers } from "redux"
import { covidReducer } from "./covidReducer"


export const rootReducer = combineReducers({
    covid : covidReducer
})