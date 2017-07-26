import {Injectable} from "@angular/core";
import {BaseRequestOptions, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {ImageToken} from "./image-token.model";
@Injectable()
export class ImageTokenService {

    private resourceUrl = 'api/image-tokens';

    constructor(private http: Http) { }

    create(imageToken: ImageToken): Observable<ImageToken> {
        let copy: ImageToken = Object.assign({}, imageToken);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(imageToken: ImageToken): Observable<ImageToken> {
        let copy: ImageToken = Object.assign({}, imageToken);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ImageToken> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
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
}
