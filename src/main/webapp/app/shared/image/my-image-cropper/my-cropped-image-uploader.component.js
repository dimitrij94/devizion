"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var image_service_1 = require("../image.service");
/**
 * Created by Dmitrij on 02.05.2017.
 */
var CropCoordinates = (function () {
    function CropCoordinates() {
    }
    return CropCoordinates;
}());
exports.CropCoordinates = CropCoordinates;
var MyCroppedImageUploaderComponent = (function () {
    function MyCroppedImageUploaderComponent(myImageService, authProvider) {
        this.myImageService = myImageService;
        this.authProvider = authProvider;
        this.imageToken = {};
        this.isImageSaved = false;
        this.isUploadRunning = false;
        this.croppedImageUploaded = new core_1.EventEmitter();
        this.uploadedCroppedImageBounds = new core_1.EventEmitter();
        this.originalImageUploaded = new core_1.EventEmitter();
        this.croppedImageUploadCanceled = new core_1.EventEmitter();
        this.originalImageUploadCanceled = new core_1.EventEmitter();
        this.cropperSettings = new ng2_img_cropper_1.CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = 798;
        this.cropperSettings.canvasHeight = 500;
        this.data = {};
    }
    MyCroppedImageUploaderComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        this.uploadedImageName = file.name;
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        image.onload = function () {
            that.imageWidth = image.width;
            that.imageHeight = image.height;
        };
        myReader.readAsDataURL(file);
    };
    MyCroppedImageUploaderComponent.prototype.getAuthorizationHeader = function () {
        return { header: 'Authorization', value: 'Bearer ' + this.authProvider.getToken() };
    };
    MyCroppedImageUploaderComponent.prototype.postImage = function () {
        if (!this.isUploadRunning)
            this.postOriginalImage(this.imageInput.nativeElement.files[0]);
    };
    MyCroppedImageUploaderComponent.prototype.cropped = function (bounds) {
        this.bounds = bounds;
    };
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
    MyCroppedImageUploaderComponent.prototype.postCroppedImage = function (fileName, bounds) {
        var _this = this;
        var cropBounds = new image_service_1.MyCropBounds(bounds);
        cropBounds.fileName = fileName;
        this.myImageService
            .postCropBounds(cropBounds, image_service_1.portfolioSubdirectory)
            .subscribe(function (imageToken) {
            _this.croppedImageUploaded.next(imageToken);
            _this.uploadedCroppedImageBounds.next(_this.getBoundsInPrcnts(bounds));
            _this.isImageSaved = true;
            _this.isUploadRunning = false;
        });
    };
    MyCroppedImageUploaderComponent.prototype.getBoundsInPrcnts = function (bounds) {
        var coords = new CropCoordinates();
        coords.cropX1 = bounds.left / this.imageWidth;
        coords.cropX2 = (bounds.left + bounds.width) / this.imageWidth;
        coords.cropY1 = bounds.top / this.imageHeight;
        coords.cropY2 = (bounds.top + bounds.height) / this.imageHeight;
        return coords;
    };
    MyCroppedImageUploaderComponent.prototype.postOriginalImage = function (file) {
        var _this = this;
        this.isUploadRunning = true;
        var self = this;
        this.myImageService
            .postImage('/api/portfolio/image', file, [this.getAuthorizationHeader()])
            .subscribe(function (res) {
            _this.originalImageUploaded.next(JSON.parse(res.response));
            self.postCroppedImage(file.name, self.bounds);
        });
    };
    MyCroppedImageUploaderComponent.prototype.imageUploadCanceled = function () {
        this.croppedImageUploadCanceled.next();
        this.originalImageUploadCanceled.next();
    };
    return MyCroppedImageUploaderComponent;
}());
__decorate([
    core_1.ViewChild('cropper', undefined)
], MyCroppedImageUploaderComponent.prototype, "cropper", void 0);
__decorate([
    core_1.ViewChild('imageInput')
], MyCroppedImageUploaderComponent.prototype, "imageInput", void 0);
__decorate([
    core_1.Output('croppedImageUploaded')
], MyCroppedImageUploaderComponent.prototype, "croppedImageUploaded", void 0);
__decorate([
    core_1.Output('uploadedCroppedImageBounds')
], MyCroppedImageUploaderComponent.prototype, "uploadedCroppedImageBounds", void 0);
__decorate([
    core_1.Output('originalImageUploaded')
], MyCroppedImageUploaderComponent.prototype, "originalImageUploaded", void 0);
__decorate([
    core_1.Output('croppedImageUploadCanceled')
], MyCroppedImageUploaderComponent.prototype, "croppedImageUploadCanceled", void 0);
__decorate([
    core_1.Output('originalImageUploadCanceled')
], MyCroppedImageUploaderComponent.prototype, "originalImageUploadCanceled", void 0);
MyCroppedImageUploaderComponent = __decorate([
    core_1.Component({
        selector: 'my-cropped-image-uploader',
        moduleId: module.id,
        templateUrl: './my-cropped-image-uploader.component.html',
        styleUrls: ['./my-cropped-image-uploader.styles.scss']
    })
], MyCroppedImageUploaderComponent);
exports.MyCroppedImageUploaderComponent = MyCroppedImageUploaderComponent;
