import { NgModule, ModuleWithProviders, OpaqueToken, Inject } from '@angular/core';

import { Store, StoreModule, Reducer, ActionReducer, Action, combineReducers, Dispatcher, } from '@ngrx/store';

import "rxjs/add/operator/take";
import "rxjs/add/operator/withLatestFrom";
import * as appReducer  from "./app-state";

const ADD_REDUCER = "@AddReducerService add reducer";

export class AddReducersService {


    constructor(appStore: Store<any>, reducer: Reducer, private dispatcher: Dispatcher) {

        // this will combine reducers in ever growing numbers
        const addReducer = (oldReducer: Function, newReducers: {[id: string]:Function }) => {
            const newReducer = combineReducers(newReducers);
            return (state, action) => {
                const newReducerKeys = Object.keys(newReducer);                
                const stateForOld = Object.keys(state).reduce((acc, key) => Object.assign(acc, newReducers[key] ? null : {[key]: state[key]}), {});
                const stateForNew = Object.keys(state).reduce((acc, key) => Object.assign(acc, newReducers[key] ? {[key]: state[key]} : null), {});

                const stateFromOld = oldReducer(stateForOld, action);

                // new reducer recieves 
                const stateFromNewReducer = newReducer(stateForNew, action);

                return Object.assign({}, stateFromOld, stateFromNewReducer);
            }
        }

        this.dispatcher
            .withLatestFrom(reducer)
            .subscribe(([a, r]) => {
                if(a.type === ADD_REDUCER) {
                    reducer.replaceReducer(addReducer(r, a.payload));
                } 
        }); 
    }

    public addReducers(reducers:{[name: string]: ActionReducer<any>}){
        this.dispatcher.dispatch({type: ADD_REDUCER, payload: reducers});
    }
}