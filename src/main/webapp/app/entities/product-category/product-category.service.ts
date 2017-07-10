import {Injectable} from "@angular/core";
import {BaseRequestOptions, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {ProductCategory, ProductCategoryWithProducts} from "./product-category.model";
import {HttpCommonService} from "../../shared/http-commons/http-common.service";
import {DomSanitizer} from "@angular/platform-browser";
import {categorySubdirectory, MyImageService} from "../../shared/image/image.service";

@Injectable()
export class ProductCategoryService {

    private resourceUrl = 'api/product-categories';
    imageDirectory = '/content/images/categories';

    constructor(private http: Http, private imageService: MyImageService) {
    }

    create(productCategory: ProductCategory): Observable<ProductCategory> {
        let copy: ProductCategory = Object.assign({}, productCategory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(productCategory: ProductCategory): Observable<ProductCategory> {
        let copy: ProductCategory = Object.assign({}, productCategory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number, includeProducts = false, productsPageSize = 10): Observable<ProductCategoryWithProducts> {
        let options = new URLSearchParams();
        options.set('id', id.toString());
        options.set('includeProducts', includeProducts.toString());
        options.set('size', productsPageSize.toString());
        return this.http.get(`${this.resourceUrl}/${id}`, {search: options}).map((res: Response) => {
            return res.json();
        });
    }

    findFirst(): Observable<ProductCategoryWithProducts> {
        return this.http.get(`${this.resourceUrl}/first?includeProducts=true`)
            .map((res: Response) => {
                return res.json();
            });
    }

    queryWithProducts(productsPageSize = 10): Observable<Response> {
        let options = HttpCommonService.wrapAsRequestOptions({
            includeProducts: true,
            productsPageSize: productsPageSize
        });
        return this.http.get(this.resourceUrl, options);
    }

    query(req?: any): Observable<Response> {
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

    categoryImageUploadCancel(category_id: number) {
        let requestParams: URLSearchParams = new URLSearchParams();
        requestParams.set('token_id', category_id.toString());
        return this.http.delete('api/category/image', {search: requestParams});
    }

    findWithProducts(id: number, page = 0, size = 1): Observable<ProductCategoryWithProducts> {
        let requestParams = new URLSearchParams();
        requestParams.set('includeProducts', 'true');
        requestParams.set('page', page.toString());
        requestParams.set('size', size.toString());
        return this.http.get(`${this.resourceUrl}/${id}`, {params: requestParams})
            .map((res: Response) => res.json());
    }

    parsePhotoUrl(photoUrl: string, domSanitizer: DomSanitizer, scalarPrcnt: number, rowWidth: number) {
        let size = this.imageService.getOptimalSize(scalarPrcnt, rowWidth);
        let newUrl = this.imageService.getImageUrlFromImageSize(categorySubdirectory, photoUrl, size);
        domSanitizer.bypassSecurityTrustUrl(newUrl);
        return newUrl;
    }
}
