import { Component, inject, signal } from '@angular/core';
import { GiftService } from '../../../Services/GiftService';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';
import { SingleGiftComponent } from '../single-gift/single-gift.component';
import { Button , ButtonModule } from "primeng/button";
import { GiftSortComponent } from "../gift-sort/gift-sort.component";
import { GetCategoryWithGiftsDto } from '../../../Models/category.model';
import { CategoryService } from '../../../Services/CategoryService';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-gifts-layout',
  standalone: true,
  imports: [SingleGiftComponent, Button, GiftSortComponent, RouterLink, ButtonModule],
  templateUrl: './gifts-layout.component.html',
  styleUrl: './gifts-layout.component.scss'
})
export class GiftsLayoutComponent {

  private giftService = inject(GiftService);
  authService = inject(AuthService);
  private categoryService = inject(CategoryService);

  selectedSortMethod = signal<string>('');
  categoriesWithGifts = signal<GetCategoryWithGiftsDto[]>([]);

  currentUserRole = this.authService.currentUserRole;

  gifts = signal<GetGiftDto[]>([]);
  ngOnInit(): void {
    this.giftService.getAllGifts().subscribe({
      next: (gifts) => {
        this.gifts.set(gifts);
        console.log('Gifts retrieved:', gifts);
      },
      error: (error) => {
        console.error('Error retrieving gifts:', error);
      }
    });
  }

  handleSortChange(newMethod: string) {
    this.selectedSortMethod.set(newMethod);
    if(this.selectedSortMethod() === 'category') {
      this.sortByCategory();      
    } else {
      this.sortByPrice();
    }
  }
handleGiftDeleted(id: number) {
  this.gifts.update(prev => prev.filter(g => g.id !== id));

  this.categoriesWithGifts.update(categories => 
    categories.map(category => ({
      ...category,
      gifts: category.gifts.filter(g => g.id !== id) // מסננים את המתנה מתוך כל קטגוריה
    }))
  );
}
  sortByPrice() {
    this.giftService.getGiftsSortedByPrice().subscribe({
      next: (gifts) => {
        this.gifts.set(gifts);
        console.log('Gifts retrieved:', gifts);
      },
      error: (error) => {
        console.error('Error retrieving gifts:', error);
      }
    });
  }
  sortByCategory() {
    this.categoryService.getAllCategoriesWithGifts().subscribe({
      next: (categoriesWithGifts) => {
        this.categoriesWithGifts.set(categoriesWithGifts);
        console.log('Categories with gifts retrieved:', categoriesWithGifts);        
      },
      error: (error) => {
        console.error('Error retrieving gifts:', error);
      }
    });
  }
}
