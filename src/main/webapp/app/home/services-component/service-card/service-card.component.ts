import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Product} from "../../../entities/product/product.model";

@Component({
    selector: 'jhi-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.styles.scss']
})
export class ServiceCardComponent implements OnInit {

    @Input()
    service: Product;
    descriptionText: string;
    showLongDescription: boolean = false;
    serviceUrl:string;

    @Output()
    onProductPhotoLoaded: EventEmitter<boolean> = new EventEmitter();

    productCroppedUrl: string;


    ngOnInit(): void {
        this.serviceUrl = `/product/${this.service.id}`;
        this.setUpImageLoadHandler();
        this.setUpDescriptionTextTooltip();
    }

    setUpDescriptionTextTooltip() {
        this.descriptionText = this.service.productDescription.slice(0, 140);
    }

    setUpImageLoadHandler() {
        let image = new Image();
        image.onload = this.onImageLoaded.bind(this);
        image.src = this.service.croppedImageUri;
    }

    onImageLoaded($event) {
        this.productCroppedUrl = this.service.croppedImageUri;
        this.onProductPhotoLoaded.emit(true);
    }

    constructor() {
    }
}
