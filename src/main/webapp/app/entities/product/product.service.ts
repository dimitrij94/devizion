import {Injectable} from "@angular/core";
import {BaseRequestOptions, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Product, ProductWithPortfolio} from "./product.model";
import {MyImageService, productSubdirectory} from "../../shared/image/image.service";
import {fortyScalar, hundredScalar, sixtyScalar} from "../../shared/image/image-size.model";
import {DomSanitizer} from "@angular/platform-browser";
import {widthOfServiceCard} from "../../home/home.component";
import {Page, PageRequest} from "../../shared/page.model";
import {servicesRowWidthPrcnt} from "../../home/services-component/shuffle-row/shuffle-cards-row.component";

import {GenericResponse} from "../../app.module";

@Injectable()
export class ProductService {

    private resourceUrl = 'api/products';
    private imagesDirectory = '../../../content/images/products';

    constructor(private http: Http, private imageService: MyImageService) {
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

    parseProductCroppedImageUrls(products: Product[], domSanitizer: DomSanitizer, productImageWidthPrcnt: number): Product[] {
        let optimalImageSize = this.imageService.getOptimalSize(productImageWidthPrcnt, window.innerWidth * servicesRowWidthPrcnt);

        products.forEach((product) => {
            product.croppedImageUri = this.imageService.getImageUrlFromImageSize(
                productSubdirectory,
                product.croppedImageUri,
                optimalImageSize
            );
            domSanitizer.bypassSecurityTrustUrl(product.croppedImageUri);
        });
        return products;
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
        return this.http.delete(`api${productSubdirectory}/image`, {search: requestParams});
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

    findByCategoryId(id: number, page: number, pageSize = 20): Observable<Page<Product>> {
        let options = new URLSearchParams();
        options.set('page', page.toString());
        options.set('categoryId', id.toString());
        options.set('size', pageSize.toString());
        return this.http.get(this.resourceUrl, {search: options}).map((res: Response) =>
            (<Page<Product>> res.json()));
    }

    findWithProductPortfolio(id: number, page = 0, pageSize = 20): Observable<GenericResponse<ProductWithPortfolio>> {
        let query = new URLSearchParams();
        query.set('includePortfolio', 'true');
        query.set('page', page.toString());
        query.set('pageSize', pageSize.toString());
        return this.http.get(`${this.resourceUrl}/${id}`, {search: query});
    }
}
