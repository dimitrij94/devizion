export class SlidePage {
    constructor(public id?: number,
                public photoUri?: string,
                public description?: string,
                public croppedPhotoUri?: string,
                public positionedLeft?: boolean,) {
        this.positionedLeft = false;
    }
}
export class DomSlidePage extends SlidePage {
    public isActive = false;
    public showDescription = true;
}
