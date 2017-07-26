/**
 * Created by Dmitrij on 24.04.2017.
 */
export enum ScreenSize{
    xs, sm, md, lg
}

export const imageScalars = [0.2, 0.4, 0.6, 0.8, 1.0];

export class ImageScalar {
    size: number|string;

    constructor(size: number|string) {
        this.size = size;
    }

    static getFillScreenScalar(numOfElements: number) {
        let portfolioImageScalar = (100/numOfElements)/100;
        let scalarDifferences = imageScalars.map((scalar) => Math.abs(scalar - portfolioImageScalar));
        let closesScalar = scalarDifferences.indexOf(Math.min.apply(null, scalarDifferences));
        switch (closesScalar){
            case(0): return twentyScalar;
            case(1): return fortyScalar;
            case(2): return sixtyScalar;
            case(3): return eightyScalar;
            case(4): return hundredScalar;
        }
    }

    toString() {
        return this.size.toString();
    }
}
export const twentyScalar: ImageScalar = new ImageScalar(0.2);
export const fortyScalar: ImageScalar = new ImageScalar(0.4);
export const sixtyScalar: ImageScalar = new ImageScalar(0.6);
export const eightyScalar: ImageScalar = new ImageScalar(0.8);
export const hundredScalar: ImageScalar = new ImageScalar('1.0');

export interface ImageSize {
    scalar?: ImageScalar;
    screenSize?: ScreenSize;
}
