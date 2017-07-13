import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";

import {Observable} from "rxjs/Rx";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AlertService, EventManager} from "ng-jhipster";

import {SlidePage} from "./slide-page.model";
import {SlidePagePopupService} from "./slide-page-popup.service";
import {SlidePageService} from "./slide-page.service";
import {ImageToken} from "../image-token";
import {MyImageService, slidePageSubdirectory} from "../../shared/image/image.service";

@Component({
    selector: 'jhi-slide-page-dialog',
    templateUrl: './slide-page-dialog.component.html'
})
export class SlidePageDialogComponent implements OnInit, OnDestroy {

    slidePage: SlidePage;
    authorities: any[];
    isSaving: boolean;
    private originalImageToken: ImageToken;
    private croppedImageToken: ImageToken;
    slidePageSubdirectory = slidePageSubdirectory;
    photosNotUploaded = true;
    croppedPhotoUploaded = false;
    originPhotoUploaded = false;
    slidePageSaved = false;

    constructor(private imageService: MyImageService,
                public activeModal: NgbActiveModal,
                private alertService: AlertService,
                private slidePageService: SlidePageService,
                private eventManager: EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }


    ngOnDestroy(): void {
        if (!this.slidePageSaved) {
            this.croppedImageToken && this.onCroppedImageRemove();
            this.originalImageToken && this.onOriginalImageRemove();
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.slidePage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.slidePageService.update(this.slidePage));
        } else {
            this.subscribeToSaveResponse(
                this.slidePageService.create(this.slidePage));
        }
    }

    onOriginalImageLoad(imageToken: ImageToken) {
        this.updatePhotoValidationStatus(this.croppedPhotoUploaded, true);
        this.originPhotoUploaded = true;
        this.slidePage.photoUri = imageToken.path;
        this.originalImageToken = imageToken;
    }

    onOriginalImageRemove() {
        this.updatePhotoValidationStatus(this.croppedPhotoUploaded, false);
        let originalImageRemoveSubscription = this.imageService
            .imageUploadCancel(this.originalImageToken.id, slidePageSubdirectory)
            .subscribe(() => {
                delete this.originalImageToken;
                originalImageRemoveSubscription.unsubscribe();
            });
    }

    onCroppedImageLoad(imageToken: ImageToken) {
        this.updatePhotoValidationStatus(true, this.originPhotoUploaded);
        this.slidePage.croppedPhotoUri = imageToken.path;
        this.croppedImageToken = imageToken;
    }

    onCroppedImageRemove(i?) {
        this.updatePhotoValidationStatus(false, this.originPhotoUploaded);
        let croppedImageRemoveSubscription = this.imageService
            .imageUploadCancel(this.croppedImageToken.id, slidePageSubdirectory)
            .subscribe(() => {
                delete this.croppedImageToken;
                croppedImageRemoveSubscription.unsubscribe();
            });
    }

    updatePhotoValidationStatus(croppedUploaded: boolean, originUploaded: boolean) {
        this.originPhotoUploaded = originUploaded;
        this.croppedPhotoUploaded = croppedUploaded;
        this.photosNotUploaded = !this.originPhotoUploaded || !this.croppedPhotoUploaded;
    }

    private subscribeToSaveResponse(result: Observable<SlidePage>) {
        result.subscribe((res: SlidePage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SlidePage) {
        this.slidePageSaved = true;
        this.eventManager.broadcast({name: 'slidePageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-slide-page-popup',
    template: ''
})
export class SlidePagePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
                private slidePagePopupService: SlidePagePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.modalRef = this.slidePagePopupService
                    .open(SlidePageDialogComponent, params['id']);
            } else {
                this.modalRef = this.slidePagePopupService
                    .open(SlidePageDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
