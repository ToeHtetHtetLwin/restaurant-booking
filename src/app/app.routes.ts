import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { FullMenuComponent } from './full-menu/full-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: ContentComponent },
      { path: 'menu', component: FullMenuComponent },
    ],
  },
];
