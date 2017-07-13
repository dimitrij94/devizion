/**
 * Created by Dmitrij on 10.07.2017.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {SlidePage} from "./slide-page.model";
import {Observable} from "rxjs/Observable";
import {SlidePageService} from "./slide-page.service";
@Injectable()
export class SlidePageResolver implements Resolve<SlidePage> {

    constructor(private slidePageService: SlidePageService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SlidePage> | Promise<SlidePage> | SlidePage {
        return this.slidePageService.query();
    }
}
