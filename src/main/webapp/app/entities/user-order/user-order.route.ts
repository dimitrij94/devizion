import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UserOrderComponent } from './user-order.component';
import { UserOrderDetailComponent } from './user-order-detail.component';
import { UserOrderPopupComponent } from './user-order-dialog.component';
import { UserOrderDeletePopupComponent } from './user-order-delete-dialog.component';

import { Principal } from '../../shared';


export const userOrderRoute: Routes = [
  {
    path: 'user-order',
    component: UserOrderComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.userOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'user-order/:id',
    component: UserOrderDetailComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.userOrder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userOrderPopupRoute: Routes = [
  {
    path: 'user-order-new',
    component: UserOrderPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.userOrder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'user-order/:id/edit',
    component: UserOrderPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.userOrder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'user-order/:id/delete',
    component: UserOrderDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.userOrder.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
