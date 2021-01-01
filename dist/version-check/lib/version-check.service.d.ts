import { HttpClient } from '@angular/common/http';
export interface IVersionCheck {
    /** (Optional) The notification method to call from the client if there is a new version available. */
    notification?: any;
    /** (Required) The frequency in milliseconds (defaults to 30 minutes). */
    frequency: number;
}
export declare class VersionCheckService {
    private http;
    private currentHash;
    private version;
    private newVersionAvailable;
    private versionCheckInterval;
    constructor(http: HttpClient);
    /**
     * Starts the version check interval for the specified frequency.
     * @param config The configuration parameters for the notification function and version check frequency.
     */
    startVersionChecking(config?: IVersionCheck): void;
    /** Stops the version check interval. */
    stopVersionChecking(): void;
    /** Will do the call and check if the hash has changed or not. */
    private checkVersion;
    /**
     * Checks if hash has changed.
     * This file has the JS hash, if it is a different one than in the version.json
     * we are dealing with version change
     * @param currentHash The current hash of the application.
     * @param newHash The new application hash from the version.json file.
     * @returns Boolean value determining if the hash has changed between the application and version.json file.
     */
    private hasHashChanged;
    /** The current build hash of the application */
    get Hash(): string;
    /** The current version number of the application */
    get Version(): string;
    /** Flag showing if a new version of the application is available. */
    get NewVersionAvailable(): boolean;
}
