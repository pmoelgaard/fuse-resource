/// <reference path='../../../typings/es6-promise/es6-promise.d.ts' />
/// <reference path='../../../typings/whatwg-fetch/whatwg-fetch.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />
/// <reference path='../fuse/fuse.d.ts' />
var fuseResources;
(function (fuseResources) {
    var Resource = (function () {
        function Resource($promise, $resolved) {
            if ($resolved === void 0) { $resolved = false; }
            this.$promise = $promise;
            this.$resolved = $resolved;
        }
        return Resource;
    })();
    fuseResources.Resource = Resource;
    var ResourceClass = (function () {
        function ResourceClass(url) {
            this.url = url;
        }
        ResourceClass.prototype.get = function (params, data, success, error) {
            var request = this.makeRequest(params, data);
            var result = new Resource(request, false);
            request.then(function (response) {
                this.resolveResult(result, response);
            }).then(function (result) {
                if (success) {
                    success(result);
                }
            }).catch(function (err) {
                if (error) {
                    error(err);
                }
            });
            return result;
        };
        ResourceClass.prototype.makeRequest = function (params, data) {
            var url = this.url;
            var options = {
                method: 'GET'
            };
            var request = fetch(url, options);
            return request;
        };
        ResourceClass.prototype.resolveResult = function (result, response) {
            _.extend(result, response);
            return result;
        };
        return ResourceClass;
    })();
    fuseResources.ResourceClass = ResourceClass;
})(fuseResources = exports.fuseResources || (exports.fuseResources = {}));
