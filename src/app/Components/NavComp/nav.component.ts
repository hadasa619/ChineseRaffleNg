import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { SidebarModule } from 'primeng/sidebar';
import { GetBasketDto } from '../../Models/basket.model';
import { BasketComponent } from '../UserComps/basket/basket.component';
import { BasketService } from '../../Services/BasketService';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarModule, BasketComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authService = inject(AuthService);
  basketService = inject(BasketService);
  visibleSidebar: boolean = false;
  basketItems: GetBasketDto[]  = [];

ngOnInit() {
    this.basketService.basketItems$.subscribe(items => {
      this.basketItems = items;
    });

    this.basketService.loadBasket();
  }
  // loadBasket(): void {
  //   this.basketService.getMyBasket().subscribe({
  //     next: (data) => this.basketItems = data,
  //     error: (err) => console.error('Failed to load basket', err)
  //   });
  // }


  // toggleSidebar() {
  //   this.visibleSidebar = !this.visibleSidebar;
  // }

}
