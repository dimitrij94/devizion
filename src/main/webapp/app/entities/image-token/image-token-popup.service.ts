import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageToken } from './image-token.model';
import { ImageTokenService } from './image-token.service';
@Injectable()
export class ImageTokenPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private imageTokenService: ImageTokenService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.imageTokenService.find(id).subscribe(imageToken => {
                this.imageTokenModalRef(component, imageToken);
            });
        } else {
            return this.imageTokenModalRef(component, new ImageToken());
        }
    }

    imageTokenModalRef(component: Component, imageToken: ImageToken): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.imageToken = imageToken;
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
