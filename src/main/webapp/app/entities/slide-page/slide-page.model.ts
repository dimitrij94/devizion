export class SlidePage {
    constructor(
        public id?: number,
        public photoUrl?: string,
        public description?: string,
        public croppedPhotoUri?: string,
        public positionedLeft?: boolean,
    ) {
        this.positionedLeft = false;
    }
}
