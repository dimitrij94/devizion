import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../../shared';

import {
    PortfolioEntryService,
    PortfolioEntryPopupService,
    PortfolioEntryComponent,
    PortfolioEntryDetailComponent,
    PortfolioEntryDialogComponent,
    PortfolioEntryPopupComponent,
    PortfolioEntryDeletePopupComponent,
    PortfolioEntryDeleteDialogComponent,
    portfolioEntryRoute,
    portfolioEntryPopupRoute,
} from './';

let ENTITY_STATES = [
    ...portfolioEntryRoute,
    ...portfolioEntryPopupRoute,
];

@NgModule({
    imports: [
        DevizionSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PortfolioEntryComponent,
        PortfolioEntryDetailComponent,
        PortfolioEntryDialogComponent,
        PortfolioEntryDeleteDialogComponent,
        PortfolioEntryPopupComponent,
        PortfolioEntryDeletePopupComponent,
    ],
    entryComponents: [
        PortfolioEntryComponent,
        PortfolioEntryDialogComponent,
        PortfolioEntryPopupComponent,
        PortfolioEntryDeleteDialogComponent,
        PortfolioEntryDeletePopupComponent,
    ],
    providers: [
        PortfolioEntryService,
        PortfolioEntryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionPortfolioEntryModule {}
