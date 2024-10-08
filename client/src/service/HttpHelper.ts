import queryString from "query-string";
import { AjaxRequest } from "rxjs/ajax";

import { RequestOptions, StringKeyValue } from "./types";
// import { LanguageType } from '@/common';

// let acceptLanguage: LanguageType = 'vi';
// export const setAcceptLanguage = (lang: LanguageType) => {
//   acceptLanguage = lang;
// };

export const asQueryString = (parameters?: StringKeyValue): string => {
  if (!parameters || Object.keys(parameters).length === 0) return "";

  return `?${queryString.stringify(parameters)}`;
};

export const buildRequestUrl = (
  path: string,
  searchParameters?: StringKeyValue
): string => {
  return `${path}${asQueryString(searchParameters)}`;
};

export const removeCustomKeys = (
  options: RequestOptions
): Partial<AjaxRequest> => {
  const requestOptions: Partial<AjaxRequest> = {};

  for (const key in options) {
    if (key === "search" || key === "headers") continue;

    requestOptions[key] = options[key as keyof AjaxRequest];
  }

  return requestOptions;
};

export const extractHeaders = (
  options: RequestOptions,
  addAcceptAndContentTypeJSON: boolean
): RequestOptions["headers"] => {
  const { headers = {} } = options;

  if (!addAcceptAndContentTypeJSON) return headers;

  const keys = Object.keys(headers).map((key: string) => key.toLowerCase());
  const newHeaders = { ...headers };

  if (!keys.includes("accept")) {
    newHeaders["accept"] = "application/json";
  }

  if (!keys.includes("content-type") && typeof options.body === "string") {
    newHeaders["content-type"] = "application/json";
  }

  // const state = Utils.getPersistAppState();
  // const { access_token } = state;
  // if (access_token && !newHeaders['authorization']) {
  //   newHeaders['authorization'] = `Bearer ${access_token}`;
  // }

  // if (!newHeaders['Accept-Language'] && acceptLanguage) {
  //   newHeaders['Accept-Language'] = acceptLanguage;
  // }

  return newHeaders;
};

export const buildRequestOptions = (
  input: any,
  options?: RequestOptions
): RequestOptions => {
  return {
    ...options,
    search: {
      ...options?.search,
      ...input,
    },
  };
};
