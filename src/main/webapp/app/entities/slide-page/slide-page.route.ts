import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../../shared";

import {SlidePageComponent} from "./slide-page.component";
import {SlidePageDetailComponent} from "./slide-page-detail.component";
import {SlidePagePopupComponent} from "./slide-page-dialog.component";
import {SlidePageDeletePopupComponent} from "./slide-page-delete-dialog.component";

export const slidePageRoute: Routes = [
    {
        path: 'slide-page',
        component: SlidePageComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.slidePage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'slide-page/:id',
        component: SlidePageDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.slidePage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const slidePagePopupRoute: Routes = [
    {
        path: 'slide-page-new',
        component: SlidePagePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.slidePage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide-page/:id/edit',
        component: SlidePagePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.slidePage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slide-page/:id/delete',
        component: SlidePageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'devizionApp.slidePage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
