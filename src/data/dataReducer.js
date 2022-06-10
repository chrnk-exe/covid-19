let initialState = {
    data: []
}

const SET_DATA = 'setData'

export const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DATA:
            return {...state, data: action.payload}
        default:
            return state
    }
}

export const setData = payload => ({type: SET_DATA, payload})