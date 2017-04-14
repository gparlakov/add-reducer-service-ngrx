import { Component } from '@angular/core';
import { Store, Reducer, Dispatcher } from "@ngrx/store";

import { AddReducersService } from "./state/add-reducers.service";
import { todoReducer, todoReducer1 } from "./state/reducers";

@Component({
  selector: 'nml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nml works!';

    constructor(appStore: Store<any>, addReducers: AddReducersService){
      appStore.subscribe(state => console.log(state));
      appStore.dispatch({type: "test this shit"});
      

       addReducers.addReducers({todoes: todoReducer});
       addReducers.addReducers({todoes1: todoReducer1});
    }
}
