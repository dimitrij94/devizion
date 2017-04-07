import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CustumerComponent } from './custumer.component';
import { CustumerDetailComponent } from './custumer-detail.component';
import { CustumerPopupComponent } from './custumer-dialog.component';
import { CustumerDeletePopupComponent } from './custumer-delete-dialog.component';

import { Principal } from '../../shared';


export const custumerRoute: Routes = [
  {
    path: 'custumer',
    component: CustumerComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'custumer/:id',
    component: CustumerDetailComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
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
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'custumer/:id/edit',
    component: CustumerPopupComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'custumer/:id/delete',
    component: CustumerDeletePopupComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'devizionApp.custumer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
