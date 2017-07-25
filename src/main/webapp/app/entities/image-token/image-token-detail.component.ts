import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { ImageToken } from './image-token.model';
import { ImageTokenService } from './image-token.service';

@Component({
    selector: 'jhi-image-token-detail',
    templateUrl: './image-token-detail.component.html'
})
export class ImageTokenDetailComponent implements OnInit, OnDestroy {

    imageToken: ImageToken;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private imageTokenService: ImageTokenService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['imageToken']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInImageTokens();
    }

    load (id) {
        this.imageTokenService.find(id).subscribe(imageToken => {
            this.imageToken = imageToken;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImageTokens() {
        this.eventSubscriber = this.eventManager.subscribe('imageTokenListModification', response => this.load(this.imageToken.id));
    }

}
