import {Product} from '../product';
import {Page} from "../../shared/page.model";
export class ProductCategory {
    constructor(public id?: number,
                public categoryName?: string,
                public categoryPhotoUri?: string,
                public categoryProducts?: Product[],) {
    }
}
export class ProductCategoryWithProducts extends ProductCategory {
    constructor(public id?: number,
                public categoryName?: string,
                public categoryPhotoUri?: string,
                public categoryProductsPage?: Page<Product[]>) {
        super(id, categoryName, categoryPhotoUri, categoryProductsPage.content)
    }
}
