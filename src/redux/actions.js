import { ADD } from "./type"
export default function ADDPROPS(props){
    return{
        type: ADD,
        payload: props
    }
}