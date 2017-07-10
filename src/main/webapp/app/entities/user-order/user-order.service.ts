import {Injectable} from "@angular/core";
import {BaseRequestOptions, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {UserOrder} from "./user-order.model";
import {DateUtils} from "ng-jhipster";
import {MyImageService, portfolioSubdirectory} from "../../shared/image/image.service";
import {DomSanitizer} from "@angular/platform-browser/src/security/dom_sanitization_service";
import {GenericResponse} from "@angular/http/src/static_response";
import {Page} from "../../shared/page.model";
@Injectable()
export class UserOrderService {

    private resourceUrl = 'api/user-orders';

    constructor(private http: Http, private dateUtils: DateUtils, private imageService: MyImageService) {
    }

    getImageUri(photoName: string, imageScalar: number, windowWidth: number) {
        return this.imageService.getImagePathOfSize(portfolioSubdirectory, photoName, windowWidth, imageScalar)
    }

    getUniqueProductsOfOrders(orders: UserOrder[]) {
        let uniqueProducts = {};
        let returnValue = [];
        orders.forEach((order) => {
            if (!uniqueProducts[order.product.id])
                uniqueProducts[order.product.id] = order.product;
        });
        for (let id in uniqueProducts)
            returnValue.push(uniqueProducts[id]);
        return returnValue;
    }

    create(userOrder: UserOrder): Observable<UserOrder> {
        let copy: UserOrder = Object.assign({}, userOrder);
        copy.orderedAt = this.dateUtils
            .convertLocalDateToServer(userOrder.orderedAt);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(userOrder: UserOrder): Observable<UserOrder> {
        let copy: UserOrder = Object.assign({}, userOrder);
        copy.orderedAt = this.dateUtils
            .convertLocalDateToServer(userOrder.orderedAt);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<UserOrder> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.orderedAt = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.orderedAt);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertPageableRespponse(res: any) {
        let jsonResponse = res.json();
        let content = jsonResponse.content;
        for (let i = 0; i < content.length; i++) {
            content[i].orderedAt = this.dateUtils
                .convertLocalDateFromServer(content[i].orderedAt);
        }
        jsonResponse.content = content;
        res._body = jsonResponse;
        return res;
    }

    private convertResponse(res: any) {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].orderedAt = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].orderedAt);
        }
        res._body = jsonResponse;
        return res;
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

    parsePortfolioCroppedImages(userOrders: UserOrder[], domSanitizer: DomSanitizer, tileWidthPrcnt: number, rowWidth: number = window.innerWidth) {
        let optimalImageSize = this.imageService.getOptimalSize(tileWidthPrcnt, rowWidth);
        userOrders.forEach((portfolio) => {
            let photoUrl = this.imageService.getImageUrlFromImageSize(
                portfolioSubdirectory,
                portfolio.cropedUri,
                optimalImageSize);
            domSanitizer.bypassSecurityTrustUrl(photoUrl);
            domSanitizer.bypassSecurityTrustStyle(photoUrl);
            portfolio.cropedUri = photoUrl;
        });
        return userOrders;
    }


    parsePortfolioModalImages(portfolio: Array<UserOrder>) {
        let optimalImageSize = this.imageService.getOptimalSize(1.0, window.innerWidth);
        portfolio.forEach((portfolio) => {
            portfolio.photoUri = this.imageService.getImageUrlFromImageSize(portfolioSubdirectory, portfolio.photoUri, optimalImageSize);
        });
    }

    findOrdersOfProduct(id: number, lastPage: number): Observable<GenericResponse<Page<UserOrder>>> {
        let options = new URLSearchParams();
        options.set('page', lastPage.toString());
        options.set('size', '20');
        options.set('productId', id.toString());
        return this.http.get(this.resourceUrl, {search: options});
    }

    findOrdersOfCategory(id: number, page: number = 0, size = 30): Observable<GenericResponse<Page<UserOrder>>> {
        let options = new URLSearchParams();
        options.set('page', page.toString());
        options.set('size', size.toString());
        options.set('categoryId', id.toString());
        return this.http.get(this.resourceUrl, {search: options});
    }

}
