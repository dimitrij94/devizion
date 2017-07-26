import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventManager, JhiLanguageService} from "ng-jhipster";

import {ImageToken} from "./image-token.model";
import {ImageTokenPopupService} from "./image-token-popup.service";
import {ImageTokenService} from "./image-token.service";

@Component({
    selector: 'jhi-image-token-delete-dialog',
    templateUrl: './image-token-delete-dialog.component.html'
})
export class ImageTokenDeleteDialogComponent {

    imageToken: ImageToken;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private imageTokenService: ImageTokenService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['imageToken']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.imageTokenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'imageTokenListModification',
                content: 'Deleted an imageToken'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-image-token-delete-popup',
    template: ''
})
export class ImageTokenDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private imageTokenPopupService: ImageTokenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.imageTokenPopupService
                .open(ImageTokenDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
