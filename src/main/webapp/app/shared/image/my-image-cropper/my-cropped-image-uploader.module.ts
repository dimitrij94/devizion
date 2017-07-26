/**
 * Created by Dmitrij on 02.05.2017.
 */
import {NgModule} from "@angular/core";
import {MyCroppedImageUploaderComponent} from "./my-cropped-image-uploader.component";
import {ImageCropperModule} from "ng2-img-cropper";
import {CommonModule} from "@angular/common";
import {DevizionSharedModule} from "../../shared.module";
import {MdProgressSpinnerModule} from "@angular/material";
@NgModule({
    imports: [ImageCropperModule, CommonModule, DevizionSharedModule, MdProgressSpinnerModule],
    exports: [MyCroppedImageUploaderComponent],
    declarations: [MyCroppedImageUploaderComponent]
})
export class MyCroppedImageUploaderModule {

}
