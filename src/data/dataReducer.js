let initialState = {
    allCases: [],
    newCases: [],
    lethalCases: [],
    recoveryCases: [],
    diff: [],
    fullyVaccinated: [],
    firstDose: [],
    secondDose: [],
}

const SET_ALL_CASES = 'setAllCases'
const SET_NEW_CASES = 'setNewCases'
const SET_LETHAL_CASES = 'setLethalCases'
const SET_RECOVERY_CASES = 'setRecoveryCases'
const SET_DIFF = 'setDiff'
const SET_FULLY_VACCINATED = 'setFullyVaccinated'
const SET_FIRST_DOSE = 'setFirstDose'
const SET_SECOND_DOSE = 'setSecondDose'

export const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ALL_CASES:
            return {...state, allCases: action.payload}
        case SET_NEW_CASES:
            return {...state, newCases: action.payload}
        case SET_LETHAL_CASES:
            return {...state, lethalCases: action.payload}
        case SET_RECOVERY_CASES:
            return {...state, recoveryCases: action.payload}
        case SET_DIFF:
            return {...state, diff: action.payload}
        case SET_FULLY_VACCINATED:
            return {...state, fullyVaccinated: action.payload}
        case SET_FIRST_DOSE:
            return {...state, firstDose: action.payload}
        case SET_SECOND_DOSE:
            return {...state, secondDose: action.payload}
        default:
            return state
    }
}

export const setAllCases = payload => ({type: SET_ALL_CASES, payload})
export const setNewCases = payload => ({type: SET_NEW_CASES, payload})
export const setLethalCases = payload => ({type: SET_LETHAL_CASES, payload})
export const setRecoveryCases = payload => ({type: SET_RECOVERY_CASES, payload})
export const setDiff = payload => ({type: SET_DIFF, payload})
export const setFullyVaccinated = payload => ({type: SET_FULLY_VACCINATED, payload})
export const setFirstDose = payload => ({type: SET_FIRST_DOSE, payload})
export const setSecondDose = payload => ({type: SET_SECOND_DOSE, payload})
