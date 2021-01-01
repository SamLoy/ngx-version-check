(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-version-check', ['exports', '@angular/core', '@angular/common/http', 'rxjs'], factory) :
    (global = global || self, factory(global['ngx-version-check'] = {}, global.ng.core, global.ng.common.http, global.rxjs));
}(this, (function (exports, i0, i1, rxjs) { 'use strict';

    /**
     * Author: Henrik Peinar
     * https://blog.nodeswat.com/automagic-reload-for-clients-after-deploy-with-angular-4-8440c9fdd96c
     */
    var VersionCheckService = /** @class */ (function () {
        function VersionCheckService(http) {
            this.http = http;
            // These will be replaced by the post-build.js script
            this.currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
            this.version = '{{POST_BUILD_ENTERS_VERSION_HERE}}';
            // Private properties
            this.newVersionAvailable = false;
        }
        /**
         * Starts the version check interval for the specified frequency.
         * @param config The configuration parameters for the notification function and version check frequency.
         */
        VersionCheckService.prototype.startVersionChecking = function (config) {
            var _this = this;
            if (config === void 0) { config = { notification: null, frequency: 1800000 }; }
            this.checkVersion(config.notification).then(function () {
                if (!_this.newVersionAvailable) {
                    _this.versionCheckInterval = rxjs.interval(config.frequency).subscribe(function () {
                        _this.checkVersion(config.notification);
                    });
                }
            });
        };
        /** Stops the version check interval. */
        VersionCheckService.prototype.stopVersionChecking = function () {
            if (this.versionCheckInterval) {
                this.versionCheckInterval.unsubscribe();
            }
        };
        /** Will do the call and check if the hash has changed or not. */
        VersionCheckService.prototype.checkVersion = function (notification) {
            var _this = this;
            // Timestamp these requests to invalidate caches
            return this.http.get("version.json?t=" + new Date().getTime()).toPromise().then(function (response) {
                _this.newVersionAvailable = _this.hasHashChanged(_this.currentHash, response.hash);
                // Stop checking for a new version if a new version is already available
                if (_this.newVersionAvailable) {
                    _this.stopVersionChecking();
                    // Call the consuming client's notification method if one exists
                    if (notification)
                        notification();
                }
            }).catch(function (err) {
                console.error(err, 'Error checking version');
            });
        };
        /**
         * Checks if hash has changed.
         * This file has the JS hash, if it is a different one than in the version.json
         * we are dealing with version change
         * @param currentHash The current hash of the application.
         * @param newHash The new application hash from the version.json file.
         * @returns Boolean value determining if the hash has changed between the application and version.json file.
         */
        VersionCheckService.prototype.hasHashChanged = function (currentHash, newHash) {
            if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
                return false;
            }
            return currentHash !== newHash;
        };
        Object.defineProperty(VersionCheckService.prototype, "Hash", {
            /** The current build hash of the application */
            get: function () {
                return this.currentHash;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VersionCheckService.prototype, "Version", {
            /** The current version number of the application */
            get: function () {
                return this.version;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VersionCheckService.prototype, "NewVersionAvailable", {
            /** Flag showing if a new version of the application is available. */
            get: function () {
                return this.newVersionAvailable;
            },
            enumerable: false,
            configurable: true
        });
        return VersionCheckService;
    }());
    VersionCheckService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VersionCheckService_Factory() { return new VersionCheckService(i0.ɵɵinject(i1.HttpClient)); }, token: VersionCheckService, providedIn: "root" });
    VersionCheckService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    VersionCheckService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };

    /*
     * Public API Surface of version-check
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.VersionCheckService = VersionCheckService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-version-check.umd.js.map
