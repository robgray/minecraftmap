/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.5.0 (NJsonSchema v10.6.6.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getLocationTypes(): Promise<LocationTypeModel[]> {
        let url_ = this.baseUrl + "/api/LocationTypes";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetLocationTypes(_response);
        });
    }

    protected processGetLocationTypes(response: Response): Promise<LocationTypeModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <LocationTypeModel[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<LocationTypeModel[]>(<any>null);
    }

    /**
     * @return Success
     */
    getMaps(maximumRingNumber: number): Promise<MapModel[]> {
        let url_ = this.baseUrl + "/api/Map/{maximumRingNumber}";
        if (maximumRingNumber === undefined || maximumRingNumber === null)
            throw new Error("The parameter 'maximumRingNumber' must be defined.");
        url_ = url_.replace("{maximumRingNumber}", encodeURIComponent("" + maximumRingNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetMaps(_response);
        });
    }

    protected processGetMaps(response: Response): Promise<MapModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <MapModel[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<MapModel[]>(<any>null);
    }

    /**
     * @return Success
     */
    getRealms(): Promise<RealmModel[]> {
        let url_ = this.baseUrl + "/api/Realm";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetRealms(_response);
        });
    }

    protected processGetRealms(response: Response): Promise<RealmModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <RealmModel[]>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel[]>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addRealm(body: NewRealmRequest | undefined): Promise<RealmModel> {
        let url_ = this.baseUrl + "/api/Realm";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddRealm(_response);
        });
    }

    protected processAddRealm(response: Response): Promise<RealmModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 201) {
            return response.text().then((_responseText) => {
            let result201: any = null;
            result201 = _responseText === "" ? null : <RealmModel>JSON.parse(_responseText, this.jsonParseReviver);
            return result201;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            result400 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel>(<any>null);
    }

    /**
     * @return Success
     */
    getRealm(realmId: string): Promise<RealmModel> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetRealm(_response);
        });
    }

    protected processGetRealm(response: Response): Promise<RealmModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <RealmModel>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel>(<any>null);
    }

    /**
     * @return Success
     */
    deleteRealm(realmId: string): Promise<void> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteRealm(_response);
        });
    }

    protected processDeleteRealm(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addLocation(realmId: string, body: NewLocationRequest | undefined): Promise<RealmModel> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddLocation(_response);
        });
    }

    protected processAddLocation(response: Response): Promise<RealmModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 201) {
            return response.text().then((_responseText) => {
            let result201: any = null;
            result201 = _responseText === "" ? null : <RealmModel>JSON.parse(_responseText, this.jsonParseReviver);
            return result201;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel>(<any>null);
    }

    /**
     * @return Success
     */
    deleteLocation(realmId: string, locationId: string): Promise<RealmModel> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location/{locationId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        if (locationId === undefined || locationId === null)
            throw new Error("The parameter 'locationId' must be defined.");
        url_ = url_.replace("{locationId}", encodeURIComponent("" + locationId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteLocation(_response);
        });
    }

    protected processDeleteLocation(response: Response): Promise<RealmModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <RealmModel>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel>(<any>null);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    updateLocation(realmId: string, locationId: string, body: UpdateLocationRequest | undefined): Promise<RealmModel> {
        let url_ = this.baseUrl + "/api/Realm/{realmId}/location/{locationId}";
        if (realmId === undefined || realmId === null)
            throw new Error("The parameter 'realmId' must be defined.");
        url_ = url_.replace("{realmId}", encodeURIComponent("" + realmId));
        if (locationId === undefined || locationId === null)
            throw new Error("The parameter 'locationId' must be defined.");
        url_ = url_.replace("{locationId}", encodeURIComponent("" + locationId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <RequestInit>{
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdateLocation(_response);
        });
    }

    protected processUpdateLocation(response: Response): Promise<RealmModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <RealmModel>JSON.parse(_responseText, this.jsonParseReviver);
            return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("Not Found", status, _responseText, _headers, result404);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RealmModel>(<any>null);
    }
}

export interface LocationTypeModel {
    id?: string;
    iconClass?: string | null;
    name?: string | null;
}

export interface MapCoordinate {
    x: number;
    y: number;
}

export interface MapBoundingBox {
    topLeft: MapCoordinate;
    bottomRight: MapCoordinate;
    topRight: MapCoordinate;
    bottomLeft: MapCoordinate;
}

export interface MapModel {
    mapNumber: number;
    ringNumber: number;
    bounds: MapBoundingBox;
}

export interface CoordinateModel {
    x: number;
    z: number;
    y: number;
}

export interface LocationModel {
    id: string;
    mapNumber: number;
    name: string;
    coordinate: CoordinateModel;
    notes: string;
    type: LocationTypeModel;
    typeId: string;
    realmId: string;
    hasPortal: boolean;
    hasEnderChest: boolean;
    hasEnchantmentTable: boolean;
    hasBed: boolean;
    hasAnvil: boolean;
    hasFurnace: boolean;
}

export interface RealmModel {
    id: string;
    name: string;
    locations: LocationModel[];
    type: LocationTypeModel;
}

export interface NewRealmRequest {
    name?: string | null;
}

export interface ProblemDetails {
    type?: string | null;
    title?: string | null;
    status?: number | null;
    detail?: string | null;
    instance?: string | null;
}

export interface NewLocationRequest {
    name?: string | null;
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
    notes?: string | null;
}

export interface UpdateLocationRequest {
    name?: string | null;
    notes?: string | null;
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