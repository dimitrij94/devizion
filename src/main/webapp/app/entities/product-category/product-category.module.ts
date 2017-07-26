import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../../shared";

import {
    ProductCategoryComponent,
    ProductCategoryDeleteDialogComponent,
    ProductCategoryDeletePopupComponent,
    ProductCategoryDetailComponent,
    ProductCategoryDialogComponent,
    ProductCategoryPopupComponent,
    productCategoryPopupRoute,
    ProductCategoryPopupService,
    productCategoryRoute,
    ProductCategoryService
} from "./";
import {ImageUploadModule} from "angular2-image-upload";
import {
    FirstProductCategoryResolver,
    ProductCategoriesResolver,
    ProductCategoryByIdResolver,
    ProductCategoryByIdWithProductsResolver
} from "./product-category.resolver";
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdChipsModule,
    MdInputModule,
    MdSelectModule,
    MdSliderModule
} from "@angular/material";
import {DevizionServicesModule} from "../../home/services-component/services.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductPipe} from "./product-detail.pipe";
import {MySidenavWrapperModule} from "../my-sidenav-wrapper/my-sidenav-wrapper.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ProductCategoryDetailPortfolioComponent} from "./product-category-detail-portfolio/product-category-detail-portfolio.component";
import {DevizionUserOrderModule} from "../user-order/user-order.module";
import {PortfolioModule} from "../../portfolio/portfolio.module";
import {PortfolioByProductsPipe} from "./product-category-detail-portfolio/portfolio-by-product.pipe";


let ENTITY_STATES = [
    ...productCategoryRoute,
    ...productCategoryPopupRoute,
];

@NgModule({
    imports: [
        ImageUploadModule.forRoot(),
        DevizionSharedModule,
        DevizionServicesModule,
        FlexLayoutModule,
        FormsModule,
        MdInputModule,
        MdSliderModule,
        MdSelectModule,
        DevizionUserOrderModule,
        MdButtonModule,
        MySidenavWrapperModule,
        ReactiveFormsModule,
        PortfolioModule,
        MdAutocompleteModule,
        MdChipsModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        ProductCategoryComponent,
        ProductCategoryDetailComponent,
        ProductCategoryDialogComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryPopupComponent,
        ProductCategoryDeletePopupComponent,
        ProductCategoryDetailPortfolioComponent,
        ProductPipe,
        PortfolioByProductsPipe
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
        ProductCategoryByIdWithProductsResolver,
        ProductCategoryPopupService,
        FirstProductCategoryResolver,
        ProductCategoryByIdResolver,
        ProductCategoriesResolver
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionProductCategoryModule {
}
