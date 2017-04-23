/**
 * Created by Dmitrij on 19.04.2017.
 */
export class ImageService {
    public static getProductImageUri(fileName: string): string {
        return '/api/image/products?imageName=' + fileName;
    }

    static getCategoryImage(fileName: string) {
        return '/api/image/categories?imageName=' + fileName;
    }
}
