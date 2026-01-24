import { Component, computed, inject, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-full-menu',
  imports: [],
  templateUrl: './full-menu.component.html',
  styleUrl: './full-menu.component.scss',
})
export class FullMenuComponent implements OnInit {
  #foodService = inject(FoodserviceService);
  public menuCategories = computed(() => {
    const menu = this.#foodService.menuResource.value();
    if (!menu) return [];
    const categories = [...new Set(menu.map((item: any) => item.category))];

    return categories.map((catName) => ({
      name: catName,
      items: menu.filter((item: any) => item.category === catName),
    }));
  });
  constructor() {}

  ngOnInit() {}
}
