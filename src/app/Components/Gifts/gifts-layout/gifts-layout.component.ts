import { Component, inject } from '@angular/core';
import { GiftService } from '../../../Services/GiftService';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';

@Component({
  selector: 'app-gifts-layout',
  standalone: true,
  imports: [],
  templateUrl: './gifts-layout.component.html',
  styleUrl: './gifts-layout.component.scss'
})
export class GiftsLayoutComponent {

  private giftService = inject(GiftService);
  private authService = inject(AuthService);
  currentUserRole = this.authService.currentUserRole;
  gifts?: GetGiftDto[];
  ngOnInit(): void {
    this.giftService.getAllGifts().subscribe({
      next: (gifts) => {
        this.gifts = gifts;
        console.log('Gifts retrieved:', gifts);
      },
      error: (error) => {
        console.error('Error retrieving gifts:', error);
      }
    });
  }

}
