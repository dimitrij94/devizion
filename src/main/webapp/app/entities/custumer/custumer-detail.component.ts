import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Custumer } from './custumer.model';
import { CustumerService } from './custumer.service';

@Component({
    selector: 'jhi-custumer-detail',
    templateUrl: './custumer-detail.component.html'
})
export class CustumerDetailComponent implements OnInit, OnDestroy {

    custumer: Custumer;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private custumerService: CustumerService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['custumer']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCustumers();
    }

    load (id) {
        this.custumerService.find(id).subscribe(custumer => {
            this.custumer = custumer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustumers() {
        this.eventSubscriber = this.eventManager.subscribe('custumerListModification', response => this.load(this.custumer.id));
    }

}
