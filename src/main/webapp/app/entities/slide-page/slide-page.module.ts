import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../../shared';

import {
    SlidePageService,
    SlidePagePopupService,
    SlidePageComponent,
    SlidePageDetailComponent,
    SlidePageDialogComponent,
    SlidePagePopupComponent,
    SlidePageDeletePopupComponent,
    SlidePageDeleteDialogComponent,
    slidePageRoute,
    slidePagePopupRoute,
} from './';

let ENTITY_STATES = [
    ...slidePageRoute,
    ...slidePagePopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SlidePageComponent,
        SlidePageDetailComponent,
        SlidePageDialogComponent,
        SlidePageDeleteDialogComponent,
        SlidePagePopupComponent,
        SlidePageDeletePopupComponent,
    ],
    entryComponents: [
        SlidePageComponent,
        SlidePageDialogComponent,
        SlidePagePopupComponent,
        SlidePageDeleteDialogComponent,
        SlidePageDeletePopupComponent,
    ],
    providers: [
        SlidePageService,
        SlidePagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionSlidePageModule {}
