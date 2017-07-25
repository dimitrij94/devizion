import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DevizionProductModule } from './product/product.module';
import { DevizionImageTokenModule } from './image-token/image-token.module';
import { DevizionUserOrderModule } from './user-order/user-order.module';
import { DevizionCustumerModule } from './custumer/custumer.module';
import { DevizionProductCategoryModule } from './product-category/product-category.module';
import { DevizionSlidePageModule } from './slide-page/slide-page.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DevizionProductModule,
        DevizionImageTokenModule,
        DevizionUserOrderModule,
        DevizionCustumerModule,
        DevizionProductCategoryModule,
        DevizionSlidePageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionEntityModule {}
