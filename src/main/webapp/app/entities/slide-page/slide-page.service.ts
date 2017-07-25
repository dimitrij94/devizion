import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {SlidePage} from "./slide-page.model";
import {MyImageService, slidePageSubdirectory} from "../../shared/image/image.service";
import {ImageSize} from "../../shared/image/image-size.model";
import {GenericResponse} from "../../app.module";

@Injectable()
export class SlidePageService {

    private resourceUrl = 'api/slide-pages';

    constructor(private http: Http,
                private imageService: MyImageService) {
    }

    parseSlidePagePhoto(slidePage: SlidePage, scalar: number, rowWidth: number = window.innerWidth) {
        let optimalSize: ImageSize = this.imageService.getOptimalSize(scalar, rowWidth);
        slidePage.photoUri = this.imageService
            .getImageUrlFromImageSize(slidePageSubdirectory, slidePage.photoUri, optimalSize);
        slidePage.croppedPhotoUri = this.imageService
            .getImageUrlFromImageSize(slidePageSubdirectory, slidePage.croppedPhotoUri, optimalSize);
    }

    parseAllSlidePagePhoto(slidePages: SlidePage[], scalar: number, rowWidth: number = window.innerWidth) {
        slidePages.forEach((val) => this.parseSlidePagePhoto(val, scalar, rowWidth));
    }

    create(slidePage: SlidePage): Observable<SlidePage> {
        const copy = this.convert(slidePage);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(slidePage: SlidePage): Observable<SlidePage> {
        const copy = this.convert(slidePage);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SlidePage> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<SlidePage[]> {
        return this.http.get(this.resourceUrl)
            .map((res: GenericResponse<SlidePage[]>) => res.json());
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convert(slidePage: SlidePage): SlidePage {
        const copy: SlidePage = Object.assign({}, slidePage);
        return copy;
    }

}
