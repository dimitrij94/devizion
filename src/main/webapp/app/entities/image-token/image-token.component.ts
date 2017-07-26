import {Component, OnDestroy, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {Subscription} from "rxjs/Rx";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";

import {ImageToken} from "./image-token.model";
import {ImageTokenService} from "./image-token.service";
import {Principal} from "../../shared";

@Component({
    selector: 'jhi-image-token',
    templateUrl: './image-token.component.html'
})
export class ImageTokenComponent implements OnInit, OnDestroy {
imageTokens: ImageToken[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private imageTokenService: ImageTokenService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['imageToken']);
    }

    loadAll() {
        this.imageTokenService.query().subscribe(
            (res: Response) => {
                this.imageTokens = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInImageTokens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: ImageToken) {
        return item.id;
    }



    registerChangeInImageTokens() {
        this.eventSubscriber = this.eventManager.subscribe('imageTokenListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
