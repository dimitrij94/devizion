import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../../shared";

import {ImageTokenComponent} from "./image-token.component";
import {ImageTokenDetailComponent} from "./image-token-detail.component";
import {ImageTokenPopupComponent} from "./image-token-dialog.component";
import {ImageTokenDeletePopupComponent} from "./image-token-delete-dialog.component";


export const imageTokenRoute: Routes = [
  {
    path: 'image-token',
    component: ImageTokenComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.imageToken.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'image-token/:id',
    component: ImageTokenDetailComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.imageToken.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const imageTokenPopupRoute: Routes = [
  {
    path: 'image-token-new',
    component: ImageTokenPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.imageToken.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'image-token/:id/edit',
    component: ImageTokenPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.imageToken.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'image-token/:id/delete',
    component: ImageTokenDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.imageToken.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
