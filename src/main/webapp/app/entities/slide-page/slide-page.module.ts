import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";
import {
    SlidePageComponent,
    SlidePageDeleteDialogComponent,
    SlidePageDeletePopupComponent,
    SlidePageDetailComponent,
    SlidePageDialogComponent,
    SlidePagePopupComponent,
    slidePagePopupRoute,
    SlidePagePopupService,
    slidePageRoute,
    SlidePageService
} from "./";
import {MyCroppedImageUploaderModule} from "../../shared/image/my-image-cropper/my-cropped-image-uploader.module";
import {SlidePageResolver} from "./slide-page.resolver";

const ENTITY_STATES = [
    ...slidePageRoute,
    ...slidePagePopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        MyCroppedImageUploaderModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
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
        SlidePageResolver,
        SlidePageService,
        SlidePagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionSlidePageModule {
}
