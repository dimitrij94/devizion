import {Injectable} from "@angular/core";
import {BaseRequestOptions, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Product} from "./product.model";
import {MyImageService, productSubdirectory} from "../../shared/image/image.service";
import {fortyScalar, hundredScalar, sixtyScalar, twentyScalar} from "../../shared/image/image-size.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ProductCategory} from "../product-category/product-category.model";
import {widthOfServiceCard} from "../../home/home.component";
import {Page, PageRequest} from "../../shared/page.model";
import {HttpCommonService} from "../../shared/http-commons/http-common.service";

@Injectable()
export class ProductService {

    private resourceUrl = 'api/products';
    private imagesDirectory = '../../../content/images/products';

    constructor(private http: Http) {
    }

    getProductScalar() {
        let windowWidth = window.innerWidth;
        let numberOfServicesDisplayed;
        if (windowWidth <= 599) {
            numberOfServicesDisplayed = 1;
        }
        if (windowWidth > 599) {
            numberOfServicesDisplayed = Math.floor((windowWidth * 0.95) / widthOfServiceCard);
        }
        if (numberOfServicesDisplayed >= 4) return fortyScalar;
        if (numberOfServicesDisplayed >= 2) return sixtyScalar;
        if (numberOfServicesDisplayed >= 1) return hundredScalar;
    }

    mapProductImageUrls(products: Product[], domSanitizer: DomSanitizer): Product[] {
        let scalar = this.getProductScalar();
        products.forEach((product) => {
            product.productImageUri = MyImageService.getImagePathOfSize(
                productSubdirectory,
                product.productImageUri,
                window.innerWidth,
                scalar
            );
            domSanitizer.bypassSecurityTrustUrl(product.productImageUri);
        });
        return products;
    }

    parseProducts(products: Product[], domSanitizer: DomSanitizer): ProductCategory[] {
        let categories = {};
        let parsedCategories: ProductCategory[] = [];
        let scalar = this.getProductScalar();

        products.forEach((product: Product) => {
            //product.productImageUri = ImageService.getProductImageUri(product.productImageUri);
            product.productImageUri = MyImageService.getImagePathOfSize(
                productSubdirectory,
                product.productImageUri,
                window.innerWidth,
                scalar
            );
            domSanitizer.bypassSecurityTrustUrl(product.productImageUri);
            let cId = product.productCategory.id;
            if (!categories[cId]) categories[cId] = product.productCategory;
            delete product.productCategory;
            if (!categories[cId].categoryProducts) categories[cId].categoryProducts = [];
            categories[cId].categoryProducts.push(product);
        });
        for (let category in categories) {
            parsedCategories.push(categories[category]);
        }
        return parsedCategories;
    }

    create(product: Product): Observable<Product> {
        let copy: Product = Object.assign({}, product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }


    productImageUploadCancel(tokenId: number) {
        let requestParams: URLSearchParams = new URLSearchParams();
        requestParams.set('token_id', tokenId.toString());
        return this.http.delete('api/product/image', {search: requestParams});
    }

    update(product: Product): Observable<Product> {
        let copy: Product = Object.assign({}, product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Product> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: PageRequest): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }

    findByCategoryId(id: number, page: PageRequest): Observable<Page<Array<Product>>> {
        let options = HttpCommonService.wrapAsRequestOptions({page: page.page, categoryId: id});

        return this.http.get(this.resourceUrl, options).map((res: Response) =>
            (<Page<Array<Product>>>res.json()));
    }
}
