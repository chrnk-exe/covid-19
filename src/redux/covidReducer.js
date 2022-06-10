
const initialState = []
export const covidReducer =(state= initialState, action)=>{
    switch(action.type){
        case 'ADD':
            return{date: action.payload.date,
                overall_cases: action.payload.overall_cases, 
                previous_day_cases: action.payload.previous_day_cases,
                recovered_people: action.payload.recovered_people,
                diseased_people: action.payload.diseased_people,
                tests_performed_more_than: action.payload.tests_performed_more_than,
                first_component_administered: action.payload.first_component_administered,
                second_component_administered: action.payload.second_component_administered,
                herd_immunity: action.payload.herd_immunity,
                hospitalized: action.payload.hospitalized,
            }
        default:
            return state 
    }
    
}