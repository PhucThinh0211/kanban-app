import { Observable, throwError } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

import {
  buildRequestUrl,
  extractHeaders,
  removeCustomKeys,
} from "./HttpHelper";
import { RequesterConfig, RequestOptions } from "./types";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const mapResponse = map((x: AjaxResponse<any>, index) => x.response);

const sendHttpRequest = (
  url: string,
  options: RequestOptions,
  headers?: any
) => {
  const ajaxRequest = removeCustomKeys(options);
  return ajax({ url, headers, ...ajaxRequest }).pipe(mapResponse);
};

const httpRequest = (url: string, options: RequestOptions): Observable<any> => {
  const mergedConfig: RequesterConfig = { includeJSONHeaders: true };
  const rUrl = buildRequestUrl(url, options.search);
  const rHeaders = extractHeaders(
    options,
    Boolean(mergedConfig.includeJSONHeaders)
  );

  return sendHttpRequest(rUrl, options).pipe(
    catchError((error: AjaxError) => {
      return throwError(() => error);
    })
  );
};

class HttpInterceptor {
  request(
    method: HttpMethod,
    url: string,
    body?: any,
    options?: RequestOptions
  ) {
    const newBody = body;
    return httpRequest(url, { ...options, method, body: newBody });
  }

  get(url: string, options?: RequestOptions) {
    return this.request(HttpMethod.GET, url, undefined, options);
  }

  post(url: string, body?: any, options?: RequestOptions) {
    return this.request(HttpMethod.POST, url, body, options);
  }

  put(url: string, body?: any, options?: RequestOptions) {
    return this.request(HttpMethod.PUT, url, body, options);
  }

  delete(url: string, options?: RequestOptions) {
    return this.request(HttpMethod.DELETE, url, undefined, options);
  }
}

const HttpClient = new HttpInterceptor();
export default HttpClient;
