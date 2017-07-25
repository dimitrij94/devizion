import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SlidePage } from './slide-page.model';
import { SlidePageService } from './slide-page.service';
@Injectable()
export class SlidePagePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private slidePageService: SlidePageService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.slidePageService.find(id).subscribe(slidePage => {
                this.slidePageModalRef(component, slidePage);
            });
        } else {
            return this.slidePageModalRef(component, new SlidePage());
        }
    }

    slidePageModalRef(component: Component, slidePage: SlidePage): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.slidePage = slidePage;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
