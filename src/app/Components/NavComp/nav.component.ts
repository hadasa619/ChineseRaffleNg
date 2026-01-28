import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { SidebarModule } from 'primeng/sidebar';
import { GetBasketDto } from '../../Models/basket.model';
import { BasketComponent } from '../UserComps/basket/basket.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarModule, BasketComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authService = inject(AuthService);
  visibleSidebar: boolean = false;
  // basketData: GetBasketDto | null = null;



  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

}
