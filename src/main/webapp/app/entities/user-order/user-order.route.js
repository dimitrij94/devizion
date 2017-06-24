"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var user_order_component_1 = require("./user-order.component");
var user_order_detail_component_1 = require("./user-order-detail.component");
var user_order_dialog_component_1 = require("./user-order-dialog.component");
var user_order_delete_dialog_component_1 = require("./user-order-delete-dialog.component");
exports.userOrderRoute = [
    {
        path: 'user-order',
        component: user_order_component_1.UserOrderComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.userOrder.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'user-order/:id',
        component: user_order_detail_component_1.UserOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.userOrder.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.userOrderPopupRoute = [
    {
        path: 'user-order-new',
        component: user_order_dialog_component_1.UserOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.userOrder.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-order/:id/edit',
        component: user_order_dialog_component_1.UserOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.userOrder.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-order/:id/delete',
        component: user_order_delete_dialog_component_1.UserOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.userOrder.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
