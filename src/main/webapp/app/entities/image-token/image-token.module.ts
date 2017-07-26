import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";

import {
    ImageTokenComponent,
    ImageTokenDeleteDialogComponent,
    ImageTokenDeletePopupComponent,
    ImageTokenDetailComponent,
    ImageTokenDialogComponent,
    ImageTokenPopupComponent,
    imageTokenPopupRoute,
    ImageTokenPopupService,
    imageTokenRoute,
    ImageTokenService
} from "./";
import {ImageUploadModule} from "angular2-image-upload";

let ENTITY_STATES = [
    ...imageTokenRoute,
    ...imageTokenPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ImageTokenComponent,
        ImageTokenDetailComponent,
        ImageTokenDialogComponent,
        ImageTokenDeleteDialogComponent,
        ImageTokenPopupComponent,
        ImageTokenDeletePopupComponent,
    ],
    entryComponents: [
        ImageTokenComponent,
        ImageTokenDialogComponent,
        ImageTokenPopupComponent,
        ImageTokenDeleteDialogComponent,
        ImageTokenDeletePopupComponent,
    ],
    providers: [
        ImageTokenService,
        ImageTokenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionImageTokenModule {}
