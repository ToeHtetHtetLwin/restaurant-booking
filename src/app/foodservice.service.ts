import { httpResource } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { MenuItem } from './models/menu-item.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodserviceService {
  constructor() {}
  public dialogVisible = signal<boolean>(false);

  /**
   * Make HTTP call to get the menu list
   */
  public menuResource = httpResource<MenuItem[]>(() => {
    return {
     url: `${environment.apiUrl}/menus`,
      method: 'GET',
    };
  });
}
