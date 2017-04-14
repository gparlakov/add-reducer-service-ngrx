import { NgModule, forwardRef, ModuleWithProviders } from "@angular/core";
import { StoreModule, Store, Dispatcher, Reducer } from "@ngrx/store";

import { AddReducersService } from "./add-reducers.service";

@NgModule({
    providers: [
        ]

})
export class AddReducersModule {
    static forRoot( store: Store<any>, dispatcher: Dispatcher, reducer: Reducer): ModuleWithProviders {
        return {
            ngModule: AddReducersModule,
            providers: [
                AddReducersService
            ]
        }
    }
}
