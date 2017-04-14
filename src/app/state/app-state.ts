import { Action, combineReducers } from "@ngrx/store";

export function state1(state: any = {state:  "state1"}, action: Action){
    console.log('state1 called with', action.type, action.payload)
    return state;
}

export function state2(state: any = {state:  "state2"}, action: Action){
    console.log('state2 called with', action.type, action.payload)
    return state;
}
 
