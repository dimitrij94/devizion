import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {EventManager} from "ng-jhipster";

import {SlidePage} from "./slide-page.model";
import {SlidePageService} from "./slide-page.service";

@Component({
    selector: 'jhi-slide-page-detail',
    templateUrl: './slide-page-detail.component.html'
})
export class SlidePageDetailComponent implements OnInit, OnDestroy {

    slidePage: SlidePage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private slidePageService: SlidePageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSlidePages();
    }

    load(id) {
        this.slidePageService.find(id).subscribe((slidePage) => {
            this.slidePage = slidePage;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSlidePages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'slidePageListModification',
            (response) => this.load(this.slidePage.id)
        );
    }
}
