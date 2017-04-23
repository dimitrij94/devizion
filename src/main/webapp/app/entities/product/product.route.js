"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var product_component_1 = require("./product.component");
var product_detail_component_1 = require("./product-detail.component");
var product_dialog_component_1 = require("./product-dialog.component");
var product_delete_dialog_component_1 = require("./product-delete-dialog.component");
exports.productRoute = [
    {
        path: 'product',
        component: product_component_1.ProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.product.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'product/:id',
        component: product_detail_component_1.ProductDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.product.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.productPopupRoute = [
    {
        path: 'product-new',
        component: product_dialog_component_1.ProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.product.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product/:id/edit',
        component: product_dialog_component_1.ProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.product.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product/:id/delete',
        component: product_delete_dialog_component_1.ProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.product.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
