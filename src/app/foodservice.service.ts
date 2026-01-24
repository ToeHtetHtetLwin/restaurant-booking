import { httpResource } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { MenuItem } from './models/menu-item.model';

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
      url: 'https://695e07292556fd22f67712d6.mockapi.io/api/v1/menus',
      method: 'GET',
    };
  });
}
