import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, BaseRequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {UserOrder} from './user-order.model';
import {DateUtils} from 'ng-jhipster';
import {MyImageService, portfolioSubdirectory} from "../../shared/image/image.service";
import {fortyScalar, ImageScalar} from "../../shared/image/image-size.model";
import {DomSanitizer} from "@angular/platform-browser/src/security/dom_sanitization_service";
@Injectable()
export class UserOrderService {

    private resourceUrl = 'api/user-orders';

    constructor(private http: Http, private dateUtils: DateUtils) {
    }

    getImageUri(photoName: string, imageScalar: ImageScalar, imageSize: number) {
        return MyImageService.getImagePathOfSize(portfolioSubdirectory, photoName, imageSize, imageScalar)
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

    parsePortfolio(userOrders: UserOrder[], domSanitizer:DomSanitizer) {
        userOrders.forEach((portfolio) => {
            let photoUrl = MyImageService.getImagePathOfSize(
                portfolioSubdirectory,
                portfolio.cropedUri,
                window.innerWidth,
                fortyScalar);
            domSanitizer.bypassSecurityTrustUrl(photoUrl);
            domSanitizer.bypassSecurityTrustStyle(photoUrl);
            portfolio.cropedUri = photoUrl;
        });
        return userOrders;
    }
}
