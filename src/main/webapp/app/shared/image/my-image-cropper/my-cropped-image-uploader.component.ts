import {Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {Bounds, CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {Header, ImageService} from "angular2-image-upload/lib/image.service";
import {AuthServerProvider} from "../../auth/auth-jwt.service";
import {MyImageService, MyCropBounds, portfolioSubdirectory} from "../image.service";
import {ImageToken} from "../../../entities/image-token/image-token.model";
/**
 * Created by Dmitrij on 02.05.2017.
 */
export class CropCoordinates {
    cropX1?: number;
    cropX2?: number;
    cropY1?: number;
    cropY2?: number;
}

@Component({
    selector: 'my-cropped-image-uploader',
    moduleId: module.id,
    templateUrl: './my-cropped-image-uploader.component.html',
    styleUrls: ['./my-cropped-image-uploader.styles.scss']
})
export class MyCroppedImageUploaderComponent {

    data: any;

    imageToken: any = {};

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    @ViewChild('imageInput')
    imageInput: ElementRef;

    bounds: Bounds;

    cropperSettings: CropperSettings;

    uploadedImageName: string;

    isImageSaved: boolean = false;

    isUploadRunning: boolean = false;

    imageWidth: number;
    imageHeight: number;


    @Output('croppedImageUploaded')
    croppedImageUploaded: EventEmitter<ImageToken> = new EventEmitter();

    @Output('uploadedCroppedImageBounds')
    uploadedCroppedImageBounds: EventEmitter<CropCoordinates> = new EventEmitter();


    @Output('originalImageUploaded')
    originalImageUploaded: EventEmitter<ImageToken> = new EventEmitter();

    @Output('croppedImageUploadCanceled')
    croppedImageUploadCanceled: EventEmitter<{}> = new EventEmitter();

    @Output('originalImageUploadCanceled')
    originalImageUploadCanceled: EventEmitter<{}> = new EventEmitter();

    constructor(private myImageService: MyImageService,
                private authProvider: AuthServerProvider) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = 798;
        this.cropperSettings.canvasHeight = 500;

        this.data = {};
    }

    fileChangeListener($event) {
        let image: any = new Image();
        let file: File = $event.target.files[0];
        this.uploadedImageName = file.name;
        let myReader: FileReader = new FileReader();
        let that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        image.onload = () => {
            that.imageWidth = image.width;
            that.imageHeight = image.height;
        }
        myReader.readAsDataURL(file);
    }

    getAuthorizationHeader() {
        return {header: 'Authorization', value: 'Bearer ' + this.authProvider.getToken()};
    }

    postImage() {
        if (!this.isUploadRunning)
            this.postOriginalImage(this.imageInput.nativeElement.files[0]);
    }

    cropped(bounds: Bounds) {
        this.bounds = bounds;
    }

    /*
     postCroppedImage() {
     this.myImageService
     .postImage(
     '/api/portfolio/image',
     new File([this.dataURItoBlob(this.data.image)],
     'cropped_' + this.uploadedImageName),
     [this.getAuthorizationHeader()]
     ).subscribe((res) => {
     if (res.status === 200) {
     this.croppedImageUploaded.next(JSON.parse(res.response));
     this.isImageSaved = true;
     }
     });
     }

     dataURItoBlob(dataURI) {
     // convert base64 to raw binary data held in a string
     // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
     var byteString = atob(dataURI.split(',')[1]);

     // separate out the mime component
     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

     // write the bytes of the string to an ArrayBuffer
     var ab = new ArrayBuffer(byteString.length);
     var ia = new Uint8Array(ab);
     for (var i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
     }

     // write the ArrayBuffer to a blob, and you're done
     var bb = new Blob([ab]);
     return bb;
     }
     */

    postCroppedImage(fileName: string, bounds: Bounds) {
        let cropBounds = new MyCropBounds(bounds);
        cropBounds.fileName = fileName;
        this.myImageService
            .postCropBounds(
                cropBounds,
                portfolioSubdirectory
            )
            .subscribe((imageToken: ImageToken) => {
                this.croppedImageUploaded.next(imageToken);
                this.uploadedCroppedImageBounds.next(this.getBoundsInPrcnts(bounds));
                this.isImageSaved = true;
                this.isUploadRunning = false;
            })
    }

    getBoundsInPrcnts(bounds: Bounds): CropCoordinates {
        let coords = new CropCoordinates();

        coords.cropX1 = bounds.left / this.imageWidth;
        coords.cropX2 = (bounds.left + bounds.width)/ this.imageWidth;

        coords.cropY1 = bounds.top / this.imageHeight;
        coords.cropY2 = (bounds.top + bounds.height) / this.imageHeight;

        return coords;
    }

    postOriginalImage(file: File) {
        this.isUploadRunning = true;
        let self = this;
        this.myImageService
            .postImage(
                '/api/portfolio/image',
                file,
                [this.getAuthorizationHeader()]
            )
            .subscribe((res) => {
                this.originalImageUploaded.next(JSON.parse(res.response));
                self.postCroppedImage(file.name, self.bounds);
            })
    }

    imageUploadCanceled() {
        this.croppedImageUploadCanceled.next();
        this.originalImageUploadCanceled.next();
    }


}
