import {Route} from '@angular/router';

import {UserRouteAccessService} from '../shared';
import {HomeComponent} from './';
import {ProductResolver} from "../entities/product/product.resolver";
import {UserOrderResolver} from "../entities/user-order/user-order.resolver";
import {
    FirstProductCategoryResolver,
    ProductCategoriesResolver
} from "../entities/product-category/product-category.resolver";

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    resolve: {
        categories: ProductCategoriesResolver,
        firstCategory: FirstProductCategoryResolver,
        portfolio: UserOrderResolver
    },
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
