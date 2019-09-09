/**
 * Author: Henrik Peinar
 * https://blog.nodeswat.com/automagic-reload-for-clients-after-deploy-with-angular-4-8440c9fdd96c
 */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { interval, Subscription } from 'rxjs'

export interface IVersionCheck {
  notification?: any
  frequency: number
}

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  newVersionAvailable: boolean = false
  versionCheckInterval: Subscription

  // These will be replaced by the post-build.js script
  public currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}'
  public version = '{{POST_BUILD_ENTERS_VERSION_HERE}}'

  constructor(private http: HttpClient) {}

  /**
   * Starts the version check interval for the specified frequency.
   * @param notification - (Optional) The notification method to call from the client if there is a new version available.
   * @param frequency - (Required) The frequency in milliseconds (defaults to 30 minutes).
   */
  // public startVersionChecking(notification: any = null, frequency = 1800000) {
  public startVersionChecking(config: IVersionCheck = { notification: null, frequency: 1800000 }) {
    this.versionCheckInterval = interval(config.frequency).subscribe(() => {
      this.checkVersion(config.notification)
    })
  }

  /** Stops the version check interval. */
  public stopVersionChecking() {
    this.versionCheckInterval.unsubscribe()
  }

  /** Will do the call and check if the hash has changed or not. */
  private checkVersion(notification: any) {
    // Timestamp these requests to invalidate caches
    this.http.get(`version.json?t=${new Date().getTime()}`).subscribe(
      (response: any) => {
        this.newVersionAvailable = this.hasHashChanged(this.currentHash, response.hash)

        // Stop checking for a new version if a new version is already available
        if (this.newVersionAvailable) {
          this.stopVersionChecking()

          // Call the consuming client's notification method if one exists
          if (notification) notification()
        }
      },
      err => {
        console.error(err, 'Error checking version')
      }
    )
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash The current hash of the application.
   * @param newHash The new application hash from the version.json file.
   * @returns Boolean value determining if the hash has changed between the application and version.json file.
   */
  private hasHashChanged(currentHash, newHash): boolean {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false
    }

    return currentHash !== newHash
  }

  /** Flag showing if a new version of the application is available. */
  get NewVersionAvailable(): boolean {
    return this.newVersionAvailable
  }
}