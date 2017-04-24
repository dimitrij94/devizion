/**
 * Created by Dmitrij on 24.04.2017.
 */
export enum ScreenSize{
    xs, sm, md, lg
}



export class ImageScalar {
    size: number;

    constructor(size: number) {
        this.size = size;
    }

    toString(){
        return this.size.toString();
    }
}
export const twentyScalar: ImageScalar = new ImageScalar(0.2);
export const fortyScalar: ImageScalar = new ImageScalar(0.4);
export const sixtyScalar: ImageScalar = new ImageScalar(0.6);
export const eightyScalar: ImageScalar = new ImageScalar(0.8);
export const hundredScalar: ImageScalar = new ImageScalar(1.0);

export interface ImageSize {
    scalar?: ImageScalar;
    screenSize?: ScreenSize;
}
