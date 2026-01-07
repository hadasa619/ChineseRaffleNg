
import { Component, Input, inject, signal } from '@angular/core';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';
import { environment } from '../../../../environments/environment';
import { Button, ButtonDirective } from "primeng/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-gift',
  standalone: true,
  imports: [Button, ButtonDirective, RouterLink],
  templateUrl: './single-gift.component.html',
  styleUrl: './single-gift.component.scss'})
export class SingleGiftComponent {
  @Input({ required: true }) gift!: GetGiftDto;
  
  authService = inject(AuthService);
  quantity = signal(1);

  get imageUrl(): string {
    if (this.gift.image) {
      return `${environment.serverUrl}/${this.gift.image}`;
    }
    return 'assets/images/default-gift.png';
  }

  addToCart() {
    console.log(`מוסיף ${this.quantity()} כרטיסים למתנה ${this.gift.title} לסל`);
    // כאן תבוא הקריאה ל-CartService
  }

  editGift() {
    console.log('עריכת מתנה:', this.gift.id);
  }

  deleteGift() {
    if (confirm('האם אתה בטוח שברצונך למחוק מתנה זו?')) {
      console.log('מחיקת מתנה:', this.gift.id);
    }
  }
}
