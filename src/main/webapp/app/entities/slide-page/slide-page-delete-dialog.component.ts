import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {EventManager} from "ng-jhipster";

import {SlidePage} from "./slide-page.model";
import {SlidePagePopupService} from "./slide-page-popup.service";
import {SlidePageService} from "./slide-page.service";

@Component({
    selector: 'jhi-slide-page-delete-dialog',
    templateUrl: './slide-page-delete-dialog.component.html'
})
export class SlidePageDeleteDialogComponent {

    slidePage: SlidePage;

    constructor(
        private slidePageService: SlidePageService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.slidePageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'slidePageListModification',
                content: 'Deleted an slidePage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slide-page-delete-popup',
    template: ''
})
export class SlidePageDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private slidePagePopupService: SlidePagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.slidePagePopupService
                .open(SlidePageDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
