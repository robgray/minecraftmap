/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.5.0 (NJsonSchema v10.6.6.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class Client {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";

    }

    /**
     * @return Success
     */
    getLocationTypes(  cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/LocationTypes";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetLocationTypes(_response);
        });
    }

    protected processGetLocationTypes(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @return Success
     */
    getMaps(maximumRingNumber: number , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Map/{maximumRingNumber}";
        if (maximumRingNumber === undefined || maximumRingNumber === null)
            throw new Error("The parameter 'maximumRingNumber' must be defined.");
        url_ = url_.replace("{maximumRingNumber}", encodeURIComponent("" + maximumRingNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetMaps(_response);
        });
    }

    protected processGetMaps(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @return Success
     */
    getRealms(  cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetRealms(_response);
        });
    }

    protected processGetRealms(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addRealm(body: NewRealmRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddRealm(_response);
        });
    }

    protected processAddRealm(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 201) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = JSON.parse(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @return Success
     */
    getRealm(realmId: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetRealm(_response);
        });
    }

    protected processGetRealm(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = JSON.parse(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @return Success
     */
    deleteRealm(realmId: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "DELETE",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteRealm(_response);
        });
    }

    protected processDeleteRealm(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = JSON.parse(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addLocation(realmId: string, body: NewLocationRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddLocation(_response);
        });
    }

    protected processAddLocation(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 201) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = JSON.parse(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @return Success
     */
    deleteLocation(realmId: string, locationId: string , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location/{locationId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        if (locationId === undefined || locationId === null)
            throw new Error("The parameter 'locationId' must be defined.");
        url_ = url_.replace("{locationId}", encodeURIComponent("" + locationId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "DELETE",
            url: url_,
            headers: {
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processDeleteLocation(_response);
        });
    }

    protected processDeleteLocation(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = JSON.parse(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateLocation(realmId: string, locationId: string, body: UpdateLocationRequest | undefined , cancelToken?: CancelToken | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location/{locationId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        if (locationId === undefined || locationId === null)
            throw new Error("The parameter 'locationId' must be defined.");
        url_ = url_.replace("{locationId}", encodeURIComponent("" + locationId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <AxiosRequestConfig>{
            data: content_,
            method: "PUT",
            url: url_,
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processUpdateLocation(_response);
        });
    }

    protected processUpdateLocation(response: AxiosResponse): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            return Promise.resolve<void>(<any>null);

        } else if (status === 404) {
            const _responseText = response.data;
            let result404: any = null;
            let resultData404  = _responseText;
            result404 = JSON.parse(resultData404);
            return throwException("Not Found", status, _responseText, _headers, result404);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<void>(<any>null);
    }
}

export interface NewRealmRequest {
    name?: string | undefined;
}

export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}

export interface NewLocationRequest {
    name?: string | undefined;
    x?: number;
    z?: number;
    y?: number;
    locationTypeId?: string;
    hasPortal?: boolean;
    hasEnderChest?: boolean;
    hasEnchantmentTable?: boolean;
    hasBed?: boolean;
    hasAnvil?: boolean;
    hasFurnace?: boolean;
    notes?: string | undefined;
}

export interface UpdateLocationRequest {
    name?: string | undefined;
    notes?: string | undefined;
    locationTypeId?: string;
    hasPortal?: boolean;
    hasEnderChest?: boolean;
    hasEnchantmentTable?: boolean;
    hasBed?: boolean;
    hasAnvil?: boolean;
    hasFurnace?: boolean;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}