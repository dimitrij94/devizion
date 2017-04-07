import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserOrder } from './user-order.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class UserOrderService {

    private resourceUrl = 'api/user-orders';

    constructor(private http: Http, private dateUtils: DateUtils) { }

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
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
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
}
