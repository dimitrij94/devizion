import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";

import {
    CustumerComponent,
    CustumerDeleteDialogComponent,
    CustumerDeletePopupComponent,
    CustumerDetailComponent,
    CustumerDialogComponent,
    CustumerPopupComponent,
    custumerPopupRoute,
    CustumerPopupService,
    custumerRoute,
    CustumerService
} from "./";
import {ImageUploadModule} from "angular2-image-upload";

let ENTITY_STATES = [
    ...custumerRoute,
    ...custumerPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CustumerComponent,
        CustumerDetailComponent,
        CustumerDialogComponent,
        CustumerDeleteDialogComponent,
        CustumerPopupComponent,
        CustumerDeletePopupComponent,
    ],
    entryComponents: [
        CustumerComponent,
        CustumerDialogComponent,
        CustumerPopupComponent,
        CustumerDeleteDialogComponent,
        CustumerDeletePopupComponent,
    ],
    providers: [
        CustumerService,
        CustumerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionCustumerModule {}
