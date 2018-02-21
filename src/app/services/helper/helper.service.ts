import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {CustomNotificationsService} from '../notifications/notifications.service';

@Injectable()
export class HelperService {

  /**
   * Function combines route url and query params
   *
   * @param route
   * @param queryParams
   * @returns {string}
   */
  constructor(private notifications: CustomNotificationsService) {}
  generateRoute(route: string, queryParams?: {}): string {

    const rootUrl = environment.api;

    let reqUrl = rootUrl + '/api/v1/' + route;
    if (queryParams) {
      reqUrl += '?';
      for (const obj in queryParams) {
        if (obj) {
          reqUrl += obj + '=' + queryParams[obj] + '&';
        }
      }
    }

    return reqUrl;
  }

  /**
   * Function creates authorization headers
   *
   * @param headers
   * @returns headers
   */
  createAuthorizationHeader(headers: HttpHeaders): any {
    return headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
            .append('Content-Type', 'application/x-www-form-urlencoded');
  }

  /**
   * Function checks response data validity
   *
   * @param response
   * @returns response
   */
  checkDataValidity(response): any {
    // if (response.body.notification) {
    //   this.notifications.notificationByType(response.body.notification);
    // }
    return response.hasOwnProperty('body') ? response.body : response;
  }

}
