import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../../shared";

import {ProductCategoryComponent} from "./product-category.component";
import {ProductCategoryDetailComponent} from "./product-category-detail.component";
import {ProductCategoryPopupComponent} from "./product-category-dialog.component";
import {ProductCategoryDeletePopupComponent} from "./product-category-delete-dialog.component";
import {
    ProductCategoriesResolver,
    ProductCategoryByIdResolver,
    ProductCategoryByIdWithProductsResolver
} from "./product-category.resolver";
import {ProductCategoryDetailPortfolioComponent} from "./product-category-detail-portfolio/product-category-detail-portfolio.component";
import {UserOrdersOfCategoryByIdResolver} from "../user-order/user-order.resolver";


export const productCategoryRoute: Routes = [
    {
        path: 'product-category',
        component: ProductCategoryComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-category/:id',
        component: ProductCategoryDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        resolve: {
            category: ProductCategoryByIdWithProductsResolver,
            allCategories: ProductCategoriesResolver
        }
    }, {
        path: 'product-category/portfolio/:id',
        component: ProductCategoryDetailPortfolioComponent,
        data: {
            authorities: [],
            pageTitle: 'devizionApp.productCategory.portfolio.title'
        },
        resolve: {
            categoryPortfolio: UserOrdersOfCategoryByIdResolver,
            category: ProductCategoryByIdResolver,
            allCategories: ProductCategoriesResolver
        }
    }
];

export const productCategoryPopupRoute: Routes = [
    {
        path: 'product-category-new',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/edit',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/delete',
        component: ProductCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
