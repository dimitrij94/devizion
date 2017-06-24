import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UserOrder} from "../../entities/user-order/user-order.model";
export const portfolioComponentHeight = 1;
const animationDuration = 2000;
@Component({
    selector: 'jhi-portfolio-modal',
    template: `
        <div id="portfolio-modal-wrapper">
            <div id="portfolio-modal-position-wrapper">
                <div id="portfolio-modal" #portfolioModal>
                    <div id="modal-content-wrapper">
                        <!-- <img id="portfolio-image" #portfolioModalImage [src]="portfolio.photoUri">-->
                        <inter-routes-spinner id="preloader" *ngIf="loading"></inter-routes-spinner>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./portfolio-modal.component.scss']
})
export class PortfolioModalComponent implements OnInit {

    /*
     * Морозильна камера бош економ классуу 250л 4350 грн. Привезенна з німечини в робочому стані.
     * В гарному стані,
     * */

    @Input('modalPortfolio')
    portfolio: UserOrder;

    @Input('boxSize')
    boxSize: {
        width: number, height: number, left: number, top: number, gridHeight: number
    };

    imageHeight: number;
    imageWidth: number;

    imageX: number;
    imageY: number;

    @ViewChild('portfolioModal')
    portfolioModal: ElementRef;

    @ViewChild('portfolioModalImage')
    portfolioModalImage: ElementRef;

    loading = true;

    constructor() {

    }

    ngOnInit() {

        //scalars determine by how much the image size has changed
        let widthScalar = 1 / (this.portfolio.croppCoordinateX2 - this.portfolio.croppCoordinateX1);
        let heightScalar = 1 / (this.portfolio.croppCoordinateY2 - this.portfolio.croppCoordinateY1);

        //image size inside of the modal view adjusted for difference in size
        this.imageWidth = this.boxSize.width * widthScalar;
        this.imageHeight = this.boxSize.height * heightScalar;


        //drag the image from view so only the cropped part of it stayed visible
        this.imageX = -this.imageWidth * this.portfolio.croppCoordinateX1;
        this.imageY = -this.imageHeight * this.portfolio.croppCoordinateY1;

        this.updatePositions();
    }

    imageLoaded($event) {
        /* size of the downloaded image without scaling */
        let originalImageWidthPx = $event.target.clientWidth;
        let originalImageHeightPx = $event.target.clientHeight;

        /* final size of the modal window in px after animation finished*/
        let modalWidthPx = window.innerWidth * 0.5;
        /* modal height is determined from the original image proportions in px */
        let modalHeightPx = (modalWidthPx * originalImageHeightPx) / originalImageWidthPx;

        /*  size of the view box in px before animation started*/
        let originalModalWidthPx = this.boxSize.width;
        let originalModalHeightPx = this.boxSize.height;

        /* change in modal size during the animation */
        let deltaModalWidth = modalWidthPx - originalModalWidthPx;
        let deltaModalHeight = modalHeightPx - originalModalHeightPx;

        /* original size of the image inside of the modal */
        let originalModalImageWidth = this.imageWidth;
        let originalModalImageHeight = this.imageHeight;

        /* final image takes the whole awailable space inside of the modal view */
        let imageDeltaW = modalWidthPx - originalModalImageWidth;
        let imageDeltaH = modalHeightPx - originalModalImageHeight;

        /* original image displacement  is equal 0 at the end of the animation*/
        let originalX = this.imageX;
        let originalY = this.imageY;

        /* modal starts at the position of the clicked tile and finishes at center of the screen  */
        let originalModalX = this.boxSize.left;
        let originalModalY = this.boxSize.top;

        let modalX = (window.innerWidth - modalWidthPx) / 2;
        let modalY = 0;

        let deltaModalX = modalX - originalModalX;
        let deltaModalY = modalY - originalModalY;

        let self = this;
        let animationStart = performance.now();

        this.loading = false;

        window.requestAnimationFrame(function showProfileModalStep(time) {
            let animationPrcnt = (time - animationStart) / animationDuration;
            let increment = self.modalAnimationTimingFunc(animationPrcnt);

            //modal imageWidth should be of the size of max modal imageWidth
            // modal imageHeight aligns itself according to image proportions
            self.boxSize.width = (increment * deltaModalWidth) + originalModalWidthPx;
            self.boxSize.height = (increment * deltaModalHeight) + originalModalHeightPx;

            //modal should be aligned at center of the grid at the end of the animation
            self.boxSize.left = (increment * deltaModalX) + originalModalX;
            self.boxSize.top = (increment * deltaModalY) + originalModalY;

            self.imageWidth = (increment * imageDeltaW) + originalModalImageWidth;
            self.imageHeight = (increment * imageDeltaH) + originalModalImageHeight;

            //imageX and imageY of the image behind the view port of modal should be at the end of the animation
            self.imageX = originalX - (increment * originalX);
            self.imageY = originalY - (increment * originalY);

            self.updatePositions();
            if (increment <= 1) window.requestAnimationFrame(showProfileModalStep);
        });
    }

    modalAnimationTimingFunc(timeFraction: number) {
        return 1 - Math.sin(Math.acos(timeFraction));
    }

    updatePositions() {
        this.portfolioModal.nativeElement.style.height = this.imageHeight + 'px';
        this.portfolioModal.nativeElement.style.width = this.imageWidth + 'px';

        this.portfolioModal.nativeElement.style.left = this.boxSize.left;
        this.portfolioModal.nativeElement.style.top = this.boxSize.top + 'px';

        this.portfolioModal.nativeElement.style.width = this.boxSize.width + 'px';
        this.portfolioModal.nativeElement.style.height = this.boxSize.height + 'px';

        this.portfolioModalImage.nativeElement.style.left = this.imageX + 'px';
        this.portfolioModalImage.nativeElement.style.top = this.imageY + 'px';
    }
}
