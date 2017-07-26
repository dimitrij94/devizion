/**
 * Created by Dmitrij on 07.07.2017.
 */
import {Observable} from "rxjs/Observable";

export class MySidenavWrapperService {
    private _scrollingObservable: Observable<any>;

    constructor() {
    }

    initializeScrollingObservable(element: HTMLDivElement) {
        this._scrollingObservable = Observable.fromEvent(element, 'scroll');
    }


    get scrollingObservable(): Observable<any> {
        return this._scrollingObservable;
    }
}
