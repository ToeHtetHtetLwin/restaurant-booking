import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FoodserviceService } from '../foodservice.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    CarouselModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ImageModule,
    ProgressSpinnerModule,
    CardModule,
  ],
  templateUrl: './content.component.html',

  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  #foodService = inject(FoodserviceService);

  public isLoading = computed(() => this.#foodService.menuResource.isLoading);
  public isError = computed(() => this.#foodService.menuResource.error);
  public popularDish = computed(() =>
    this.#foodService.menuResource
      .value()
      ?.filter((dish: any) => dish.category == 'Main')
      .slice(0, 4),
  );

  public responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  public detailVisible = false;
  public selectedDish: any = null;

  public reviews = [
    {
      id: 1,
      comment:
        'Food is delicious and the interior desing of the restaurant is so pretty.Best Serving .',
      name: 'Aden',
    },
    {
      id: 2,
      comment:
        'The Mala Xiang Guo was incredible. The spices were perfectly balanced. Highly recommended!',
      name: 'Daniel',
    },
    {
      id: 3,
      comment:
        'The best asian food in city .Best services and highly recommended',
      name: 'Justin',
    },
  ];

  public restImage = [
    {
      id: 1,
      image: 'assets/res1.jpg',
    },

    {
      id: 2,
      image: 'assets/res3.jpg',
    },
    {
      id: 3,
      image: 'assets/res.jpg',
    },
    {
      id: 4,
      image: 'assets/res4.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}

  /**
   * Show dialog
   */
  showReservation() {
    this.#foodService.dialogVisible.set(true);
  }

  reloadMenu() {
    this.#foodService.menuResource.reload();
  }

  // Function to trigger the view more detail
  viewDishDetails(dish: any) {
    this.selectedDish = dish;
    this.detailVisible = true;
  }
}
