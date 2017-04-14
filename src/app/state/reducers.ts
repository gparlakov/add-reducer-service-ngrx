import { ActionReducer, Action } from "@ngrx/store";

import { Item, Todo, TodoGroup } from "./models"; 

export const actionTypes  = {
    addTodo: "addTodo",
    toggleTodo: "toggleTodo",
    toggleTodo1: "toggleTodo1",
    removeTodo: "removeTodo",
}

class TodoState {
    todoes: {id: number, text: string }[];
    doneIds: number[];
    nextId: number;
}

const initialState: TodoState =  {
    todoes: [{id: 1, text: "do"},{id: 2, text: "do 2"},{id: 3, text: "do3"},{id: 4, text: "do4"},], 
    doneIds:[], 
    nextId: 5};

export function todoReducer(state: TodoState = initialState, action: Action): TodoState {
     
        switch(action.type){
            case actionTypes.addTodo:   
                return Object.assign({}, state,{ 
                    todoes: state.todoes.concat({id: state.nextId, text:action.payload}),
                    nextId: state.nextId += 1
                })
            case actionTypes.removeTodo: 
                return Object.assign({}, state,{ 
                    todoes: state.todoes.filter(t => t.id !== action.payload),
                })
            case actionTypes.toggleTodo: 
                return Object.assign({}, state,{ 
                    doneIds: state.doneIds.some(i => i === action.payload) ? 
                        state.doneIds.filter(i => i === action.payload) :
                        state.doneIds.concat(action.payload),
                })
            default: 
                return state;

        }
    }


const initialState1: TodoState =  {
    todoes: [{id: 1, text: "do"},{id: 2, text: "do 2"},{id: 3, text: "do3"},{id: 4, text: "do4"},], 
    doneIds:[], 
    nextId: 5};

export function todoReducer1(state: TodoState = initialState1, action: Action): TodoState {
     
        switch(action.type){
            case actionTypes.toggleTodo1: 
                return Object.assign({}, state,{ 
                    doneIds: state.doneIds.some(i => i === action.payload) ? 
                        state.doneIds.filter(i => i === action.payload) :
                        state.doneIds.concat(action.payload),
                })
            default: 
                return state;

        }
    }

