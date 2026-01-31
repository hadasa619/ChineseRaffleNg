
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';
import { environment } from '../../../../environments/environment';
import { Button, ButtonDirective } from "primeng/button";
import { RouterLink, Router } from '@angular/router';
import { GiftService } from '../../../Services/GiftService';
import { BasketService } from '../../../Services/BasketService';
import { AddBasketDto } from '../../../Models/basket.model';


@Component({
  selector: 'app-single-gift',
  standalone: true,
  imports: [Button, ButtonDirective, RouterLink],
  templateUrl: './single-gift.component.html',
  styleUrl: './single-gift.component.scss'
})
export class SingleGiftComponent {
  @Input({ required: true }) gift!: GetGiftDto;
  @Output() giftDeleted = new EventEmitter<number>();

  authService = inject(AuthService);
  basketService = inject(BasketService);
  quantity = signal(1);
  giftService = inject(GiftService);
  private router = inject(Router);


  get imageUrl(): string {
    if (this.gift.image) {
      return `${environment.serverUrl}/${this.gift.image}`;
    }
    return 'assets/images/default-gift.png';
  }

  addToBasket() {
    const basket: AddBasketDto = {
      giftId: this.gift.id,
      quantity: this.quantity(),
      userId: this.authService.getCurrentUser()!.id
    };
    this.basketService.addToBasket(basket).subscribe({
      next: () => {
        this.basketService.openSidebar();
      },
      error: (err) => {
        console.error('Error adding gift to basket', err);
      }
    });
  }

  deleteGift() {
      if(confirm('Are you sure you want to delete this gift?')) {
      this.giftService.deleteGift(this.gift.id).subscribe({
        next: () => {
          console.log('Gift deleted successfully');
          this.giftDeleted.emit(this.gift.id);
        },
        error: (err) => {
          console.error('Error deleting gift', err);
        }
      });
    }
  }
}
