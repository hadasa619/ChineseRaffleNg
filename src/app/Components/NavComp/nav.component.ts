import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { MessageService } from 'primeng/api';
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
  messageService = inject(MessageService);
  visibleSidebar: boolean = false;
  basketItems: GetBasketDto[] = [];
  private router = inject(Router);

  ngOnInit() {
    this.basketService.basketItems$.subscribe(items => {
      this.basketItems = items;
    });

    this.basketService.loadBasket();
  }

  openBasket() {
    if (!this.authService.isLoggedIn()) {
      this.messageService.add({ severity: 'error', summary: 'Authentication required', detail: 'Please log in to view your basket.' });
      return;
    }
    this.basketService.isSidebarVisible.set(true);
  }

  logout() {
    this.authService.logout();
    this.messageService.add({ severity: 'success', summary: 'Logged out', detail: 'You have been logged out.' });
    this.router.navigate(['/']);
  }
}
