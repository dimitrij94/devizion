"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var image_token_component_1 = require("./image-token.component");
var image_token_detail_component_1 = require("./image-token-detail.component");
var image_token_dialog_component_1 = require("./image-token-dialog.component");
var image_token_delete_dialog_component_1 = require("./image-token-delete-dialog.component");
exports.imageTokenRoute = [
    {
        path: 'image-token',
        component: image_token_component_1.ImageTokenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.imageToken.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'image-token/:id',
        component: image_token_detail_component_1.ImageTokenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.imageToken.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.imageTokenPopupRoute = [
    {
        path: 'image-token-new',
        component: image_token_dialog_component_1.ImageTokenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.imageToken.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-token/:id/edit',
        component: image_token_dialog_component_1.ImageTokenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.imageToken.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-token/:id/delete',
        component: image_token_delete_dialog_component_1.ImageTokenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'devizionApp.imageToken.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];
