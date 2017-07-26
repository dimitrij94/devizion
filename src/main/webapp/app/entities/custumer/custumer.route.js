"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var custumer_component_1 = require("./custumer.component");
var custumer_detail_component_1 = require("./custumer-detail.component");
var custumer_dialog_component_1 = require("./custumer-dialog.component");
var custumer_delete_dialog_component_1 = require("./custumer-delete-dialog.component");
exports.custumerRoute = [
    {
        path: 'custumer',
        component: custumer_component_1.CustumerComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.custumer.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'custumer/:id',
        component: custumer_detail_component_1.CustumerDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.custumer.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.custumerPopupRoute = [
    {
        path: 'custumer-new',
        component: custumer_dialog_component_1.CustumerPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.custumer.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'custumer/:id/edit',
        component: custumer_dialog_component_1.CustumerPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.custumer.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'custumer/:id/delete',
        component: custumer_delete_dialog_component_1.CustumerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.custumer.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
