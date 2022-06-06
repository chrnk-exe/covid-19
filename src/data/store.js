import { configureStore, combineReducers } from "redux";
import { dataReducer } from './dataReducer'

let store = configureStore(dataReducer)