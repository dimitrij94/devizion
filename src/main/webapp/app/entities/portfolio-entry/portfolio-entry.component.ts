import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { PortfolioEntry } from './portfolio-entry.model';
import { PortfolioEntryService } from './portfolio-entry.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-portfolio-entry',
    templateUrl: './portfolio-entry.component.html'
})
export class PortfolioEntryComponent implements OnInit, OnDestroy {
portfolioEntries: PortfolioEntry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private portfolioEntryService: PortfolioEntryService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['portfolioEntry']);
    }

    loadAll() {
        this.portfolioEntryService.query().subscribe(
            (res: Response) => {
                this.portfolioEntries = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPortfolioEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: PortfolioEntry) {
        return item.id;
    }



    registerChangeInPortfolioEntries() {
        this.eventSubscriber = this.eventManager.subscribe('portfolioEntryListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
