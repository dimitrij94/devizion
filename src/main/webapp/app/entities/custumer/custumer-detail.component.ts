import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {AlertService, EventManager, JhiLanguageService} from 'ng-jhipster';

import {Custumer} from './custumer.model';
import {CustumerService} from './custumer.service';
import {ImageToken} from "../image-token/image-token.model";
import {AuthServerProvider} from "../../shared/auth/auth-jwt.service";
import {MyImageService} from "../../shared/image/image.service";

@Component({
    selector: 'jhi-custumer-detail',
    templateUrl: './custumer-detail.component.html'
})
export class CustumerDetailComponent implements OnInit, OnDestroy {

    custumer: Custumer;
    private subscription: any;
    private eventSubscriber: Subscription;
    imageToken: ImageToken;

    constructor(private eventManager: EventManager,
                private jhiLanguageService: JhiLanguageService,
                private custumerService: CustumerService,
                private authServiceProvider: AuthServerProvider,
                private alertService: AlertService,
                private imageService: MyImageService,
                private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['custumer']);
    }

    onRemove($event) {
        this.imageService
            .imageUploadCancel(this.imageToken[$event.file.name].id, "custumer")
            .subscribe(() => {
                delete this.imageToken[$event.file.name];
            });
    }


    onLoad($event: any) {
        if ($event.serverResponse.status == 200) {
            let imageToken = JSON.parse($event.serverResponse.response);
            this.custumer.custumerImageUri = imageToken.path;
            this.imageToken[$event.file.name] = imageToken;
        }
        else
            this.onError($event.serverResponse.json());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCustumers();
    }

    load(id) {
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
