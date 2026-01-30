import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FoodserviceService } from '../foodservice.service';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-full-menu',
  imports: [FormsModule, SelectButton,CommonModule],
  templateUrl: './full-menu.component.html',
  styleUrl: './full-menu.component.scss',
})
export class FullMenuComponent implements OnInit {
  #foodService = inject(FoodserviceService);
  categoryOptions: any[] = [
    { name: 'Main', value: 'Main' },
    { name: 'Appetizer', value: 'Appetizer' },
    { name: 'Dessert', value: 'Dessert' },
    { name: 'Drinks', value: 'Drinks' },
  ];
  public selectedMenu = signal<any>('');
  public menuCategories = computed(() => {
    const menu = this.#foodService.menuResource.value();

    const activeFilter = this.selectedMenu();

    if (!menu) return [];
    const filteredMenu = activeFilter
      ? menu.filter((item: any) => item.category === activeFilter)
      : menu;

    const categories = [
      ...new Set(filteredMenu.map((item: any) => item.category)),
    ];

    return categories.map((catName) => ({
      name: catName,
      items: filteredMenu.filter((item: any) => item.category === catName),
    }));
  });

  constructor() {}

  ngOnInit() {}

  filterData(event: any) {
    this.selectedMenu.set(event.value);
  }
}
