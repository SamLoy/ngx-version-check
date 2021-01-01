/**
 * Author: Henrik Peinar
 * https://blog.nodeswat.com/automagic-reload-for-clients-after-deploy-with-angular-4-8440c9fdd96c
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class VersionCheckService {
    constructor(http) {
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
    startVersionChecking(config = { notification: null, frequency: 1800000 }) {
        this.checkVersion(config.notification).then(() => {
            if (!this.newVersionAvailable) {
                this.versionCheckInterval = interval(config.frequency).subscribe(() => {
                    this.checkVersion(config.notification);
                });
            }
        });
    }
    /** Stops the version check interval. */
    stopVersionChecking() {
        if (this.versionCheckInterval) {
            this.versionCheckInterval.unsubscribe();
        }
    }
    /** Will do the call and check if the hash has changed or not. */
    checkVersion(notification) {
        // Timestamp these requests to invalidate caches
        return this.http.get(`version.json?t=${new Date().getTime()}`).toPromise().then((response) => {
            this.newVersionAvailable = this.hasHashChanged(this.currentHash, response.hash);
            // Stop checking for a new version if a new version is already available
            if (this.newVersionAvailable) {
                this.stopVersionChecking();
                // Call the consuming client's notification method if one exists
                if (notification)
                    notification();
            }
        }).catch(err => {
            console.error(err, 'Error checking version');
        });
    }
    /**
     * Checks if hash has changed.
     * This file has the JS hash, if it is a different one than in the version.json
     * we are dealing with version change
     * @param currentHash The current hash of the application.
     * @param newHash The new application hash from the version.json file.
     * @returns Boolean value determining if the hash has changed between the application and version.json file.
     */
    hasHashChanged(currentHash, newHash) {
        if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
            return false;
        }
        return currentHash !== newHash;
    }
    /** The current build hash of the application */
    get Hash() {
        return this.currentHash;
    }
    /** The current version number of the application */
    get Version() {
        return this.version;
    }
    /** Flag showing if a new version of the application is available. */
    get NewVersionAvailable() {
        return this.newVersionAvailable;
    }
}
VersionCheckService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VersionCheckService_Factory() { return new VersionCheckService(i0.ɵɵinject(i1.HttpClient)); }, token: VersionCheckService, providedIn: "root" });
VersionCheckService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
VersionCheckService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi1jaGVjay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvdmVyc2lvbi1jaGVjay9zcmMvbGliL3ZlcnNpb24tY2hlY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFnQixNQUFNLE1BQU0sQ0FBQTs7O0FBYTdDLE1BQU0sT0FBTyxtQkFBbUI7SUFTOUIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVJwQyxxREFBcUQ7UUFDN0MsZ0JBQVcsR0FBRyxpQ0FBaUMsQ0FBQTtRQUMvQyxZQUFPLEdBQUcsb0NBQW9DLENBQUE7UUFFdEQscUJBQXFCO1FBQ2Isd0JBQW1CLEdBQVksS0FBSyxDQUFBO0lBR0osQ0FBQztJQUV6Qzs7O09BR0c7SUFDSSxvQkFBb0IsQ0FBQyxTQUF3QixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtRQUM1RixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3BFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUN4QyxDQUFDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQXdDO0lBQ2pDLG1CQUFtQjtRQUN4QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDeEM7SUFDSCxDQUFDO0lBRUQsaUVBQWlFO0lBQ3pELFlBQVksQ0FBQyxZQUFpQjtRQUNwQyxnREFBZ0Q7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDaEcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFL0Usd0VBQXdFO1lBQ3hFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtnQkFFMUIsZ0VBQWdFO2dCQUNoRSxJQUFJLFlBQVk7b0JBQUUsWUFBWSxFQUFFLENBQUE7YUFDakM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO1FBQzlDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxjQUFjLENBQUMsV0FBVyxFQUFFLE9BQU87UUFDekMsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLEtBQUssaUNBQWlDLEVBQUU7WUFDckUsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELE9BQU8sV0FBVyxLQUFLLE9BQU8sQ0FBQTtJQUNoQyxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFBO0lBQ2pDLENBQUM7Ozs7WUFsRkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFiUSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEF1dGhvcjogSGVucmlrIFBlaW5hclxyXG4gKiBodHRwczovL2Jsb2cubm9kZXN3YXQuY29tL2F1dG9tYWdpYy1yZWxvYWQtZm9yLWNsaWVudHMtYWZ0ZXItZGVwbG95LXdpdGgtYW5ndWxhci00LTg0NDBjOWZkZDk2Y1xyXG4gKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcclxuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWZXJzaW9uQ2hlY2sge1xyXG4gIC8qKiAoT3B0aW9uYWwpIFRoZSBub3RpZmljYXRpb24gbWV0aG9kIHRvIGNhbGwgZnJvbSB0aGUgY2xpZW50IGlmIHRoZXJlIGlzIGEgbmV3IHZlcnNpb24gYXZhaWxhYmxlLiAqL1xyXG4gIG5vdGlmaWNhdGlvbj86IGFueVxyXG5cclxuICAvKiogKFJlcXVpcmVkKSBUaGUgZnJlcXVlbmN5IGluIG1pbGxpc2Vjb25kcyAoZGVmYXVsdHMgdG8gMzAgbWludXRlcykuICovXHJcbiAgZnJlcXVlbmN5OiBudW1iZXJcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVmVyc2lvbkNoZWNrU2VydmljZSB7XHJcbiAgLy8gVGhlc2Ugd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgcG9zdC1idWlsZC5qcyBzY3JpcHRcclxuICBwcml2YXRlIGN1cnJlbnRIYXNoID0gJ3t7UE9TVF9CVUlMRF9FTlRFUlNfSEFTSF9IRVJFfX0nXHJcbiAgcHJpdmF0ZSB2ZXJzaW9uID0gJ3t7UE9TVF9CVUlMRF9FTlRFUlNfVkVSU0lPTl9IRVJFfX0nXHJcblxyXG4gIC8vIFByaXZhdGUgcHJvcGVydGllc1xyXG4gIHByaXZhdGUgbmV3VmVyc2lvbkF2YWlsYWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgcHJpdmF0ZSB2ZXJzaW9uQ2hlY2tJbnRlcnZhbDogU3Vic2NyaXB0aW9uXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyB0aGUgdmVyc2lvbiBjaGVjayBpbnRlcnZhbCBmb3IgdGhlIHNwZWNpZmllZCBmcmVxdWVuY3kuXHJcbiAgICogQHBhcmFtIGNvbmZpZyBUaGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzIGZvciB0aGUgbm90aWZpY2F0aW9uIGZ1bmN0aW9uIGFuZCB2ZXJzaW9uIGNoZWNrIGZyZXF1ZW5jeS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnRWZXJzaW9uQ2hlY2tpbmcoY29uZmlnOiBJVmVyc2lvbkNoZWNrID0geyBub3RpZmljYXRpb246IG51bGwsIGZyZXF1ZW5jeTogMTgwMDAwMCB9KSB7XHJcbiAgICB0aGlzLmNoZWNrVmVyc2lvbihjb25maWcubm90aWZpY2F0aW9uKS50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLm5ld1ZlcnNpb25BdmFpbGFibGUpIHtcclxuICAgICAgICB0aGlzLnZlcnNpb25DaGVja0ludGVydmFsID0gaW50ZXJ2YWwoY29uZmlnLmZyZXF1ZW5jeSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tWZXJzaW9uKGNvbmZpZy5ub3RpZmljYXRpb24pXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogU3RvcHMgdGhlIHZlcnNpb24gY2hlY2sgaW50ZXJ2YWwuICovXHJcbiAgcHVibGljIHN0b3BWZXJzaW9uQ2hlY2tpbmcoKSB7XHJcbiAgICBpZiAodGhpcy52ZXJzaW9uQ2hlY2tJbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLnZlcnNpb25DaGVja0ludGVydmFsLnVuc3Vic2NyaWJlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBXaWxsIGRvIHRoZSBjYWxsIGFuZCBjaGVjayBpZiB0aGUgaGFzaCBoYXMgY2hhbmdlZCBvciBub3QuICovXHJcbiAgcHJpdmF0ZSBjaGVja1ZlcnNpb24obm90aWZpY2F0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIFRpbWVzdGFtcCB0aGVzZSByZXF1ZXN0cyB0byBpbnZhbGlkYXRlIGNhY2hlc1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYHZlcnNpb24uanNvbj90PSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YCkudG9Qcm9taXNlKCkudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm5ld1ZlcnNpb25BdmFpbGFibGUgPSB0aGlzLmhhc0hhc2hDaGFuZ2VkKHRoaXMuY3VycmVudEhhc2gsIHJlc3BvbnNlLmhhc2gpXHJcblxyXG4gICAgICAvLyBTdG9wIGNoZWNraW5nIGZvciBhIG5ldyB2ZXJzaW9uIGlmIGEgbmV3IHZlcnNpb24gaXMgYWxyZWFkeSBhdmFpbGFibGVcclxuICAgICAgaWYgKHRoaXMubmV3VmVyc2lvbkF2YWlsYWJsZSkge1xyXG4gICAgICAgIHRoaXMuc3RvcFZlcnNpb25DaGVja2luZygpXHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIGNvbnN1bWluZyBjbGllbnQncyBub3RpZmljYXRpb24gbWV0aG9kIGlmIG9uZSBleGlzdHNcclxuICAgICAgICBpZiAobm90aWZpY2F0aW9uKSBub3RpZmljYXRpb24oKVxyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVyciwgJ0Vycm9yIGNoZWNraW5nIHZlcnNpb24nKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBoYXNoIGhhcyBjaGFuZ2VkLlxyXG4gICAqIFRoaXMgZmlsZSBoYXMgdGhlIEpTIGhhc2gsIGlmIGl0IGlzIGEgZGlmZmVyZW50IG9uZSB0aGFuIGluIHRoZSB2ZXJzaW9uLmpzb25cclxuICAgKiB3ZSBhcmUgZGVhbGluZyB3aXRoIHZlcnNpb24gY2hhbmdlXHJcbiAgICogQHBhcmFtIGN1cnJlbnRIYXNoIFRoZSBjdXJyZW50IGhhc2ggb2YgdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAqIEBwYXJhbSBuZXdIYXNoIFRoZSBuZXcgYXBwbGljYXRpb24gaGFzaCBmcm9tIHRoZSB2ZXJzaW9uLmpzb24gZmlsZS5cclxuICAgKiBAcmV0dXJucyBCb29sZWFuIHZhbHVlIGRldGVybWluaW5nIGlmIHRoZSBoYXNoIGhhcyBjaGFuZ2VkIGJldHdlZW4gdGhlIGFwcGxpY2F0aW9uIGFuZCB2ZXJzaW9uLmpzb24gZmlsZS5cclxuICAgKi9cclxuICBwcml2YXRlIGhhc0hhc2hDaGFuZ2VkKGN1cnJlbnRIYXNoLCBuZXdIYXNoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWN1cnJlbnRIYXNoIHx8IGN1cnJlbnRIYXNoID09PSAne3tQT1NUX0JVSUxEX0VOVEVSU19IQVNIX0hFUkV9fScpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRIYXNoICE9PSBuZXdIYXNoXHJcbiAgfVxyXG5cclxuICAvKiogVGhlIGN1cnJlbnQgYnVpbGQgaGFzaCBvZiB0aGUgYXBwbGljYXRpb24gKi9cclxuICBnZXQgSGFzaCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEhhc2hcclxuICB9XHJcblxyXG4gIC8qKiBUaGUgY3VycmVudCB2ZXJzaW9uIG51bWJlciBvZiB0aGUgYXBwbGljYXRpb24gKi9cclxuICBnZXQgVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxyXG4gIH1cclxuXHJcbiAgLyoqIEZsYWcgc2hvd2luZyBpZiBhIG5ldyB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBhdmFpbGFibGUuICovXHJcbiAgZ2V0IE5ld1ZlcnNpb25BdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXdWZXJzaW9uQXZhaWxhYmxlXHJcbiAgfVxyXG59XHJcbiJdfQ==