import {
    eightyScalar,
    fortyScalar,
    hundredScalar,
    ImageScalar,
    ImageSize,
    ScreenSize,
    sixtyScalar,
    twentyScalar
} from "./image-size.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Header} from "angular2-image-upload/lib/image.service";
import {Bounds} from "ng2-img-cropper";
import {ImageToken} from "../../entities/image-token";
/**
 * Created by Dmitrij on 19.04.2017.
 */

export const productSubdirectory = "/products";
export const categorySubdirectory = "/categories";
export const portfolioSubdirectory = "/portfolio";
export const custumerSubdirectory = '/custumer';

export const imageRootPath = '/api/image';

export class MyCropBounds {
    fileName?: string;

    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;

    constructor(bounds: Bounds) {
        this.left = bounds.left;
        this.right = bounds.right;
        this.top = bounds.top;
        this.bottom = bounds.bottom;
        this.width = bounds.width;
        this.height = bounds.height;
    }
}

@Injectable()
export class MyImageService {


    constructor(private http: Http) {

    }

    postCropBounds(bounds: MyCropBounds, subdir: string): Observable<ImageToken> {
        let copy: MyCropBounds = Object.assign({}, bounds);
        return this.http.post('/api' + subdir + '/image/cropped', copy)
            .map((res: Response) => {
                return res.json();
            })
    }

    postImage(url: string, image: any, headers: Header[],
              progressCallback?: (progress: number) => any) {
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        return Observable.create(function (observer) {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append('image', image);
            if (progressCallback)
                xhr.onprogress = function (event) {
                    progressCallback(event.loaded / event.total)
                };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next({response: xhr.response, status: xhr.status});
                        observer.complete();
                    }
                    else {
                        observer.error({response: xhr.response, status: xhr.status});
                    }
                }
            };
            xhr.open('POST', url, true);
            if (headers)
                for (let i = 0; i < headers.length; i++) {
                    let header = headers[i];
                    xhr.setRequestHeader(header.header, header.value);
                }
            xhr.send(formData);
        });
    }

    imageUploadCancel(tokenId: number, subdirectory: string) {
        let requestParams: URLSearchParams = new URLSearchParams();
        requestParams.set('token_id', tokenId.toString());
        return this.http.delete('api/' + subdirectory + '/image', {search: requestParams});
    }

    static getCategoryImage(fileName: string) {
        return '/api/image/categories?imageName=' + fileName;
    }


    getImagePathOfSize(subdirectory: string, fileName: string, windowWidth?: number, scalar?: number) {
        let imageSize = this.getOptimalSize(scalar, windowWidth);
        return this.getImageUrlFromImageSize(subdirectory, fileName, imageSize);
    }

    getImageUrlFromImageSize(subdirectory: string, fileName: string, imageSize: ImageSize) {
        return imageRootPath + '/size' + subdirectory +
            "?imageName=" + fileName +
            "&imageScalarSize=" + imageSize.scalar.toString() +
            "&screenSize=" + ScreenSize[imageSize.screenSize];
    }

    static getImageSize(windowWidth: number, scalar: ImageScalar): ImageSize {
        let imageSize: ImageSize = {scalar: scalar};

        if (windowWidth <= 599) {
            imageSize.screenSize = ScreenSize.xs;
        }
        if (windowWidth >= 600 && windowWidth <= 959) {
            imageSize.screenSize = ScreenSize.sm;
        }
        if (windowWidth >= 960 && windowWidth <= 1279) {
            imageSize.screenSize = ScreenSize.md;
        }
        if (windowWidth >= 1280) {
            imageSize.screenSize = ScreenSize.lg;
        }
        return imageSize;
    }

    windowBreakpoints = [600, 960, 1280, 1920];
    scalars = [0.2, 0.4, 0.6, 0.8, 1.0];

    getOptimalSize(scalar: number, rowWidth = window.innerWidth): ImageSize {
        let breakpoints = this.windowBreakpoints;
        let scalars = this.scalars;
        let containerSize = scalar * rowWidth;
        //i stands for breakpoints index, j stands for scalar index
        let minI = this.windowBreakpoints.length - 1, minJ = this.scalars.length - 1;
        let delta = this.getDelta(containerSize, scalars[minJ], breakpoints[minI]);
        let minDelta = delta;
        for (let i = 0; i < this.windowBreakpoints.length; i++) {
            for (let j = 0; j < this.scalars.length; j++) {
                delta = this.getDelta(containerSize, scalars[j], breakpoints[i]);
                if (delta > 0 && delta < minDelta) {
                    minDelta = delta;
                    minI = i;
                    minJ = j;
                }
            }
        }
        return this.getImageUrlParser(minJ, minI);
    }

    getDelta(containerWidth, scalar, breakpoint) {
        let scaledWidth = breakpoint * scalar;
        return scaledWidth - containerWidth;
    }

    getImageUrlParser(scalarIndex: number, breakpointIndex: number): ImageSize {
        let screenSize;
        let scalar;
        switch (breakpointIndex) {
            case 0:
                screenSize = ScreenSize.xs;
                break;
            case 1:
                screenSize = ScreenSize.sm;
                break;
            case 2:
                screenSize = ScreenSize.md;
                break;
            case 3:
                screenSize = ScreenSize.lg;
                break;
        }
        switch (scalarIndex) {
            case 0:
                scalar = twentyScalar;
                break;
            case 1:
                scalar = fortyScalar;
                break;
            case 2:
                scalar = sixtyScalar;
                break;
            case 3:
                scalar = eightyScalar;
                break;
            case 4:
                scalar = hundredScalar;
                break;
        }
        return {scalar: scalar, screenSize: screenSize};
    }

}
