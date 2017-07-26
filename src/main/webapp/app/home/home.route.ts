import {Route} from "@angular/router";
import {HomeComponent} from "./";
import {UserOrderResolver} from "../entities/user-order/user-order.resolver";
import {
    FirstProductCategoryResolver,
    ProductCategoriesResolver
} from "../entities/product-category/product-category.resolver";
import {SlidePageResolver} from "../entities/slide-page/slide-page.resolver";

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    resolve: {
        categories: ProductCategoriesResolver,
        firstCategory: FirstProductCategoryResolver,
        portfolio: UserOrderResolver,
        slides: SlidePageResolver
    },
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
