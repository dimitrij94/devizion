import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../../shared';

import {
    ProductCategoryService,
    ProductCategoryPopupService,
    ProductCategoryComponent,
    ProductCategoryDetailComponent,
    ProductCategoryDialogComponent,
    ProductCategoryPopupComponent,
    ProductCategoryDeletePopupComponent,
    ProductCategoryDeleteDialogComponent,
    productCategoryRoute,
    productCategoryPopupRoute,
} from './';

let ENTITY_STATES = [
    ...productCategoryRoute,
    ...productCategoryPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductCategoryComponent,
        ProductCategoryDetailComponent,
        ProductCategoryDialogComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryPopupComponent,
        ProductCategoryDeletePopupComponent,
    ],
    entryComponents: [
        ProductCategoryComponent,
        ProductCategoryDialogComponent,
        ProductCategoryPopupComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryDeletePopupComponent,
    ],
    providers: [
        ProductCategoryService,
        ProductCategoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionProductCategoryModule {}
