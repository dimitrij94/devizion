import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SlidePageComponent } from './slide-page.component';
import { SlidePageDetailComponent } from './slide-page-detail.component';
import { SlidePagePopupComponent } from './slide-page-dialog.component';
import { SlidePageDeletePopupComponent } from './slide-page-delete-dialog.component';

import { Principal } from '../../shared';


export const slidePageRoute: Routes = [
  {
    path: 'slide-page',
    component: SlidePageComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'devizionApp.slidePage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'slide-page/:id',
    component: SlidePageDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
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
        authorities: ['ROLE_USER'],
        pageTitle: 'devizionApp.slidePage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'slide-page/:id/edit',
    component: SlidePagePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'devizionApp.slidePage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'slide-page/:id/delete',
    component: SlidePageDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'devizionApp.slidePage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
