import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PortfolioEntryComponent } from './portfolio-entry.component';
import { PortfolioEntryDetailComponent } from './portfolio-entry-detail.component';
import { PortfolioEntryPopupComponent } from './portfolio-entry-dialog.component';
import { PortfolioEntryDeletePopupComponent } from './portfolio-entry-delete-dialog.component';

import { Principal } from '../../shared';


export const portfolioEntryRoute: Routes = [
  {
    path: 'portfolio-entry',
    component: PortfolioEntryComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.portfolioEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'portfolio-entry/:id',
    component: PortfolioEntryDetailComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.portfolioEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const portfolioEntryPopupRoute: Routes = [
  {
    path: 'portfolio-entry-new',
    component: PortfolioEntryPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.portfolioEntry.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'portfolio-entry/:id/edit',
    component: PortfolioEntryPopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.portfolioEntry.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'portfolio-entry/:id/delete',
    component: PortfolioEntryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER','ROLE_ADMIN'],
        pageTitle: 'devizionApp.portfolioEntry.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
