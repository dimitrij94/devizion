import { Product } from '../product';
export class ProductCategory {
    constructor(
        public id?: number,
        public categoryName?: string,
        public categoryPhotoUri?: string,
        public categoryProducts?: Product[],
    ) {
    }
}
