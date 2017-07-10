import {Component, OnDestroy, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {Subscription} from "rxjs/Rx";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";

import {Custumer} from "./custumer.model";
import {CustumerService} from "./custumer.service";
import {Principal} from "../../shared";
import {custumerSubdirectory, MyImageService} from "../../shared/image/image.service";

@Component({
    selector: 'jhi-custumer',
    templateUrl: './custumer.component.html',
    styleUrls: ['./custumer.component.style.scss']
})
export class CustumerComponent implements OnInit, OnDestroy {
    custumers: Custumer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
                private custumerService: CustumerService,
                private alertService: AlertService,
                private eventManager: EventManager,
                private imageService: MyImageService,
                private principal: Principal) {
        this.jhiLanguageService.setLocations(['custumer']);
    }

    loadAll() {
        this.custumerService.query().subscribe(
            (res: Response) => {
                let custumers = res.json();
                custumers.forEach((custumer) => {
                    custumer.custumerImageUri = this.imageService.getImagePathOfSize(
                        custumerSubdirectory,
                        custumer.custumerImageUri,
                        window.innerWidth,
                        15)
                });
                this.custumers = custumers;
            },
            (res: Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustumers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Custumer) {
        return item.id;
    }


    registerChangeInCustumers() {
        this.eventSubscriber = this.eventManager.subscribe('custumerListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
