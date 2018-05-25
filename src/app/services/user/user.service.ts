import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class UserService {

  constructor(private service: MainService) { }

  /**
   * Gets array of items
   * @returns {Observable<any>}
   */
  getItems(): Observable<any> {
    return this.service.get('users');
  }
}
