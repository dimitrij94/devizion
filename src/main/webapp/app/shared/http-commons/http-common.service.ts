/**
 * Created by Dmitrij on 23.06.2017.
 */
export class HttpCommonService {
    public static wrapAsRequestOptions(requestParams: any) {
        let parsedParams: URLSearchParams = new URLSearchParams();
        for (let param in requestParams) {
            parsedParams.set(param, requestParams[param]);
        }
        return parsedParams;
    }
}
