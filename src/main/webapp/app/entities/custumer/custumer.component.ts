import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService} from 'ng-jhipster';

import {Custumer} from './custumer.model';
import {CustumerService} from './custumer.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {custumerSubdirectory, MyImageService} from "../../shared/image/image.service";
import {twentyScalar} from "../../shared/image/image-size.model";

@Component({
    selector: 'jhi-custumer',
    templateUrl: './custumer.component.html',
    styleUrls:['./custumer.component.style.scss']
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
                    custumer.custumerImageUri = MyImageService.getImagePathOfSize(
                        custumerSubdirectory,
                        custumer.custumerImageUri,
                        window.innerWidth,
                        twentyScalar)
                });
                this.custumers =custumers;
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
