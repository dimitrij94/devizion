import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../../shared';

import {
    UserOrderService,
    UserOrderPopupService,
    UserOrderComponent,
    UserOrderDetailComponent,
    UserOrderDialogComponent,
    UserOrderPopupComponent,
    UserOrderDeletePopupComponent,
    UserOrderDeleteDialogComponent,
    userOrderRoute,
    userOrderPopupRoute,
} from './';

let ENTITY_STATES = [
    ...userOrderRoute,
    ...userOrderPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserOrderComponent,
        UserOrderDetailComponent,
        UserOrderDialogComponent,
        UserOrderDeleteDialogComponent,
        UserOrderPopupComponent,
        UserOrderDeletePopupComponent,
    ],
    entryComponents: [
        UserOrderComponent,
        UserOrderDialogComponent,
        UserOrderPopupComponent,
        UserOrderDeleteDialogComponent,
        UserOrderDeletePopupComponent,
    ],
    providers: [
        UserOrderService,
        UserOrderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionUserOrderModule {}
