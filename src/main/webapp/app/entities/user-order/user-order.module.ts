import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";

import {
    UserOrderComponent,
    UserOrderDeleteDialogComponent,
    UserOrderDeletePopupComponent,
    UserOrderDetailComponent,
    UserOrderDialogComponent,
    UserOrderPopupComponent,
    userOrderPopupRoute,
    UserOrderPopupService,
    userOrderRoute,
    UserOrderService
} from "./";
import {MyCroppedImageUploaderModule} from "../../shared/image/my-image-cropper/my-cropped-image-uploader.module";
import {UserOrderResolver} from "./user-order.resolver";

let ENTITY_STATES = [
    ...userOrderRoute,
    ...userOrderPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        MyCroppedImageUploaderModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
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
        UserOrderResolver,
        UserOrderService,
        UserOrderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionUserOrderModule {
}
