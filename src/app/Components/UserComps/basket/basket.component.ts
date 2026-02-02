import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // הכרחי ל-Standalone
import { GetBasketDto } from '../../../Models/basket.model';
import { BasketService } from '../../../Services/BasketService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import confetti from 'canvas-confetti';
import { environment } from '../../../../environments/environment';
import { MessageModule } from 'primeng/message';
import { GiftService } from '../../../Services/GiftService';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    InputNumberModule, 
    ToastModule, 
    DialogModule, 
    ConfirmDialogModule,
    MessageModule
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  public basketService = inject(BasketService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  giftService = inject(GiftService)
  environment = environment;

  showSuccessDialog: boolean = false;

  @Input() basketItems: GetBasketDto[] = [];

  ngOnInit(): void {
    console.log('Basket items received:', this.basketItems);
  }

  updateQuantity(item: GetBasketDto, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.basketService.updateBasket(item.id, { quantity: newQuantity }).subscribe({
        next: () => item.quantity = newQuantity,
        error: (err) => console.error('Update failed', err)
      });
    }
  }

  removeFromBasket(itemId: number): void {
    this.basketService.deleteBasket(itemId).subscribe({
      next: () => {
        this.basketItems = this.basketItems.filter(i => i.id !== itemId);
      }
    });
  }

  calculateTotal(): number {
    return this.basketItems.reduce((sum, item) => sum + (item.quantity * item.giftTicketPrice), 0);
  }

  calculateTickets(): number {
    return this.basketItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  buyTickets(): void {
    this.basketService.buyTickets().subscribe({
      next: () => {
        // 1. איפוס המערך המקומי
        this.basketItems = [];
        
        // 2. פתיחת הדיאלוג לפני סגירת הסיידבר
        this.showSuccessDialog = true;
        
        // 3. עדכון ה-Signal בשרות לסגירת הסיידבר
        this.basketService.isSidebarVisible.set(false);
        
        // 4. הפעלת הקונפטי
        this.fireConfetti();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Purchase failed' });
        console.error('Purchase failed', err);
      }
    });
  }

  confirmBuying() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to finally buy all the tickets?',
      header: 'Buy Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, Buy Now!',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.buyTickets();
      }
    });
  }

  private fireConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#ff1111', '#10b981', '#fbbf24']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#ff1111', '#10b981', '#fbbf24']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }
}