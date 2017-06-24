import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../../shared';

import {
    ProductService,
    ProductPopupService,
    ProductComponent,
    ProductDetailComponent,
    ProductDialogComponent,
    ProductPopupComponent,
    ProductDeletePopupComponent,
    ProductDeleteDialogComponent,
    productRoute,
    productPopupRoute,
} from './';
import {ImageUploadModule} from 'angular2-image-upload';
import {ProductResolver} from "./product.resolver";
import {FirstProductCategoryResolver} from "../product-category/product-category.resolver";

let ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];
@NgModule({
    imports: [
        DevizionSharedModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductDialogComponent,
        ProductDeleteDialogComponent,
        ProductPopupComponent,
        ProductDeletePopupComponent,
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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionProductModule {}
