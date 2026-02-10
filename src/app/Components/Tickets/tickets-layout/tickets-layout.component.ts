import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';      
import { DialogModule } from 'primeng/dialog';    
import { ButtonModule } from 'primeng/button';   
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';    
import { ToastModule } from 'primeng/toast';      
import { MessageService } from 'primeng/api';     
import { GetGiftDto, GetGiftWithBuyersDto } from '../../../Models/gift.model';
import { GiftService } from '../../../Services/GiftService';
import { GetUserDto } from '../../../Models/user.model';
import { TagModule } from 'primeng/tag'; 
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tickets-layout',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, ButtonModule,
     DropdownModule, BadgeModule, 
    ToastModule, TagModule],
  templateUrl: './tickets-layout.component.html',
  styleUrl: './tickets-layout.component.scss'
})
export class TicketsLayoutComponent {
  giftService = inject(GiftService);
  displayBuyersDialog: boolean = false;
  selectedGiftTitle: string = '';
  buyersForSelectedGift = signal<GetUserDto[]>([]); 
  gifts = signal<GetGiftWithBuyersDto[]>([]);
  messageService = new MessageService();

  selectedGiftId = signal<number | null>(null);
  filteredGifts = signal<GetGiftWithBuyersDto[] | null>(null);
  environment = environment;


  
  
  onGiftSelect(event: any) {
    const id = event.value;

    this.selectedGiftId.set(id);
    if (!this.selectedGiftId()) {
          this.filteredGifts.set(this.gifts());
      } else {
          const result = this.gifts().filter(g => g.id === this.selectedGiftId());
          this.filteredGifts.set(result);
      }
   }
  

  ngOnInit(): void {
        this.giftService.getGiftsWithBuyers().subscribe({
      next: (gifts) => {
        this.gifts.set(gifts);
        
      },
      error: (error) => {
        console.error('Error retrieving gifts:', error);
      }
    });

   }
  

openBuyersDialog(giftId: any) {
    const gift = this.gifts().find(g => g.id === giftId);
    if (gift) {
        this.selectedGiftTitle = gift.title;
        this.buyersForSelectedGift.set(gift.buyers); 
        this.displayBuyersDialog = true;
    }
}
}
