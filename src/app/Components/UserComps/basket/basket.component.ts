import { Component, Input } from '@angular/core';
import { GetBasketDto,UpdateBasketDto } from '../../../Models/basket.model';
import { BasketService } from '../../../Services/BasketService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { inject } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [TableModule, ButtonModule, InputNumberModule, ToastModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

private basketService = inject(BasketService);

  @Input() basketItems: GetBasketDto[] = []; 

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
    return this.basketItems.reduce((sum, item) => sum + (item.quantity), 0);
  }
}
