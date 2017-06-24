"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var product_category_component_1 = require("./product-category.component");
var product_category_detail_component_1 = require("./product-category-detail.component");
var product_category_dialog_component_1 = require("./product-category-dialog.component");
var product_category_delete_dialog_component_1 = require("./product-category-delete-dialog.component");
exports.productCategoryRoute = [
    {
        path: 'product-category',
        component: product_category_component_1.ProductCategoryComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'product-category/:id',
        component: product_category_detail_component_1.ProductCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.productCategoryPopupRoute = [
    {
        path: 'product-category-new',
        component: product_category_dialog_component_1.ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/edit',
        component: product_category_dialog_component_1.ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/delete',
        component: product_category_delete_dialog_component_1.ProductCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.productCategory.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
