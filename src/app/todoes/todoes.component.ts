import { Component } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";

import { actionTypes } from "../state/reducers";

@Component({
    selector: "todoes",
    template: `
        <div>
            TODOES
            <ng-container *ngFor="let i of (todoes | async)">
                <p><button (click)="toggle(i.id)"> <span> <ng-container *ngIf="i.done">X</ng-container><ng-container *ngIf="!i.done">V</ng-container> </span></button>{{i.text}}</p>
            </ng-container>
        </div>

        TODOES 1
        <ng-container *ngFor="let i of (todoes1 | async)">
            <p><button (click)="toggle1(i.id)"> <span> <ng-container *ngIf="i.done">X</ng-container><ng-container *ngIf="!i.done">V</ng-container> </span></button>{{i.text}}</p>
        </ng-container>
    `
})
export class TodoesComponent {

    todoes: Observable<{id: number, text: string}[]>;
    todoes1: Observable<{id: number, text: string}[]>;

    constructor(private store: Store<any>) {
        const todoes: Observable<any[]> = store.select("todoes", "todoes");
        const done: Observable<number[]> = store.select("todoes", "doneIds");

        this.todoes = todoes
            .combineLatest(done)
            .filter(([t, d]) => t != null && d != null)
            .map(([todoes, done]) => todoes.map(t =>  
                Object.assign(t, {done: done.some(d => t.id === d)})));

        const todoes1: Observable<any[]> = store.select("todoes1", "todoes");
        const done1: Observable<number[]> = store.select("todoes1", "doneIds");

        this.todoes1 = todoes1
            .do(console.warn)
            .combineLatest(done1)
            .do(console.info)
            .filter(([t, d]) => t != null && d != null)
            .map(([todoes, done]) => todoes.map(t =>  
                Object.assign(t, {done: done.some(d => t.id === d)})));        
        
    }

    toggle(id) {
        this.store.dispatch({type: actionTypes.toggleTodo, payload: id });
    }

    toggle1(id) {
        this.store.dispatch({type: actionTypes.toggleTodo1, payload: id });
    }
}