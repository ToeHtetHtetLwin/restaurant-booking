import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FoodserviceService } from '../foodservice.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  #foodService = inject(FoodserviceService);
  #router = inject(Router);
  menuItems: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {
    this.menuItems = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Menu', routerLink: '/home/menu' },
      {
        label: 'Chef',
        command: () => this.navigateToSection('chef'),
      },
      {
        label: 'Ambience',
        command: () => this.navigateToSection('ambience'),
      },
      {
        label: 'Reviews',
        command: () => this.navigateToSection('reviews'),
      },
    ];
  }

  navigateToSection(id: string) {
    if (this.#router.url == '/home') {
      this.scrollToSection(id);
    } else {
      this.#router.navigate(['/home']).then(() => {
        setTimeout(() => this.scrollToSection(id), 100);
      });
    }
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  showReservation() {
    this.#foodService.dialogVisible.set(true);
  }
}
