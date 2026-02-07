
import { Component, EventEmitter, Input, Output, effect, inject, signal } from '@angular/core';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';
import { environment } from '../../../../environments/environment';
import { Button, ButtonDirective } from "primeng/button";
import { RouterLink, Router } from '@angular/router';
import { GiftService } from '../../../Services/GiftService';
import { BasketService } from '../../../Services/BasketService';
import { AddBasketDto } from '../../../Models/basket.model';
import { MessageModule } from 'primeng/message';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-single-gift',
  standalone: true,
  imports: [Button, ButtonDirective, RouterLink, MessageModule],
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
  messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);


  get imageUrl(): string {
    if (this.gift.image) {
      return `${environment.serverUrl}/${this.gift.image}`;
    }
    return 'assets/images/default-gift.png';
  }


  addToBasket() {
    if (!this.authService.isLoggedIn()) {
      this.messageService.add({ severity: 'error', summary: 'Authentication required', detail: 'Please log in to add items to your basket.' });
      return;
    }
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this gift?',
      header: 'Delete Gift',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.giftService.deleteGift(this.gift.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Gift deleted successfully' });
            this.giftDeleted.emit(this.gift.id);
          },
          error: (err) => {
            console.error('Error deleting gift', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete gift' });
          }
        });
      }
    });
  }
}
