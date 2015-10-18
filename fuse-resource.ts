/// <reference path='../../../typings/es6-promise/es6-promise.d.ts' />
/// <reference path='../../../typings/whatwg-fetch/whatwg-fetch.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />
/// <reference path='../fuse/fuse.d.ts' />

export module fuseResources {

    export class Resource<T> {
        constructor(public $promise?:Promise<Response>, public $resolved:boolean = false) {
        }
    }

    export class ResourceClass<T> {

        public url:string;

        constructor(url:string) {
            this.url = url;
        }

        get(params?:any, data?:Object, success?:Function, error?:Function):Resource<T> {

            var request:Promise<Response> = this.makeRequest(params, data);

            var result:Resource<T> = new Resource(request, false);

            request
                .then(function (response:Response):void {
                    this.resolveResult(result, response);
                })
                .then(function (result:any) {
                    if (success) {
                        success(result);
                    }
                })
                .catch(function (err:Error) {
                    if (error) {
                        error(err);
                    }
                })

            return result;
        }

        private makeRequest(params?:any, data?:Object):Promise<Response> {

            var url:string = this.url;
            var options:RequestInit = {
                method: 'GET'
            }

            var request:Promise<Response> = fetch(url, options);
            return request;
        }

        private resolveResult(result:T, response:Response):T {
            _.extend(result, response);
            return result;
        }
    }
}