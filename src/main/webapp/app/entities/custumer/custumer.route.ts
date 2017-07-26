import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../../shared";

import {CustumerComponent} from "./custumer.component";
import {CustumerDetailComponent} from "./custumer-detail.component";
import {CustumerPopupComponent} from "./custumer-dialog.component";
import {CustumerDeletePopupComponent} from "./custumer-delete-dialog.component";


export const custumerRoute: Routes = [
  {
    path: 'custumer',
    component: CustumerComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'custumer/:id',
    component: CustumerDetailComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const custumerPopupRoute: Routes = [
  {
    path: 'custumer-new',
    component: CustumerPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'custumer/:id/edit',
    component: CustumerPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'custumer/:id/delete',
    component: CustumerDeletePopupComponent,
    data: {
        authorities:['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
