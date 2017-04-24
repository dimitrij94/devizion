import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryPopupComponent } from './product-category-dialog.component';
import { ProductCategoryDeletePopupComponent } from './product-category-delete-dialog.component';

import { Principal } from '../../shared';


export const productCategoryRoute: Routes = [
  {
    path: 'product-category',
    component: ProductCategoryComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'product-category/:id',
    component: ProductCategoryDetailComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productCategoryPopupRoute: Routes = [
  {
    path: 'product-category-new',
    component: ProductCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'product-category/:id/edit',
    component: ProductCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'product-category/:id/delete',
    component: ProductCategoryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
