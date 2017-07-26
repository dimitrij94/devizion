import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";

import {
    ProductComponent,
    ProductDeleteDialogComponent,
    ProductDeletePopupComponent,
    ProductDetailComponent,
    ProductDialogComponent,
    ProductPopupComponent,
    productPopupRoute,
    ProductPopupService,
    productRoute,
    ProductService
} from "./";
import {ProductByIdResolver, ProductResolver} from "./product.resolver";
import {MyCroppedImageUploaderModule} from "../../shared/image/my-image-cropper/my-cropped-image-uploader.module";
import {MdButtonModule, MdInputModule} from "@angular/material";
import {PortfolioModule} from "../../portfolio/portfolio.module";
import {DevizionUserOrderModule} from "../user-order/user-order.module";
import {MySidenavWrapperModule} from "../my-sidenav-wrapper/my-sidenav-wrapper.module";
import {DevizionProductCategoryModule} from "../product-category/product-category.module";
import {FormsModule} from "@angular/forms";
import {ProductDetailOrdersPipe} from "./product-detail-orders.pipe";
import {FlexLayoutModule} from "@angular/flex-layout";

let ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];
@NgModule({
    imports: [
        MdInputModule,
        MySidenavWrapperModule,
        DevizionUserOrderModule,
        FormsModule,
        FlexLayoutModule,
        PortfolioModule,
        DevizionSharedModule,
        DevizionProductCategoryModule,
        MyCroppedImageUploaderModule,
        MdButtonModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductDialogComponent,
        ProductDeleteDialogComponent,
        ProductPopupComponent,
        ProductDeletePopupComponent,
        ProductDetailOrdersPipe
    ],
    entryComponents: [
        ProductComponent,
        ProductDialogComponent,
        ProductPopupComponent,
        ProductDeleteDialogComponent,
        ProductDeletePopupComponent,
    ],
    providers: [
        ProductResolver,
        ProductService,
        ProductPopupService,
        ProductByIdResolver
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionProductModule {
}
