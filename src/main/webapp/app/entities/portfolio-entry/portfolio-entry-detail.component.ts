import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { PortfolioEntry } from './portfolio-entry.model';
import { PortfolioEntryService } from './portfolio-entry.service';

@Component({
    selector: 'jhi-portfolio-entry-detail',
    templateUrl: './portfolio-entry-detail.component.html'
})
export class PortfolioEntryDetailComponent implements OnInit, OnDestroy {

    portfolioEntry: PortfolioEntry;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private portfolioEntryService: PortfolioEntryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['portfolioEntry']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInPortfolioEntries();
    }

    load (id) {
        this.portfolioEntryService.find(id).subscribe(portfolioEntry => {
            this.portfolioEntry = portfolioEntry;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPortfolioEntries() {
        this.eventSubscriber = this.eventManager.subscribe('portfolioEntryListModification', response => this.load(this.portfolioEntry.id));
    }

}
