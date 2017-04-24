import {ImageScalar, ImageSize, ScreenSize} from "./image-size.model";
/**
 * Created by Dmitrij on 19.04.2017.
 */

export const productSubdirectory = "/products";
export const categorySubdirectory = "/categories";
export const portfolioSubdirectory = "/portfolio";
export const imageRootPath = '/api/image/size';
export class ImageService {
    public static getProductImageUri(fileName: string): string {
        return '/api/image/products?imageName=' + fileName;
    }

    static getCategoryImage(fileName: string) {
        return '/api/image/categories?imageName=' + fileName;
    }

    static getImagePathOfSize(subdirectory: string, fileName: string, windowWidth: number, scalar: ImageScalar) {
        let imageSize = this.getImageSize(windowWidth, scalar);
        return imageRootPath + subdirectory +
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

}
