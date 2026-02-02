import { Component, inject, signal, OnInit } from '@angular/core';
import { GiftService } from '../../../Services/GiftService';
import { GetGiftDto } from '../../../Models/gift.model';
import { AuthService } from '../../../Services/AuthService';
import { SingleGiftComponent } from '../single-gift/single-gift.component';
import { ButtonModule } from "primeng/button";
import { PaginatorModule } from 'primeng/paginator';
import { GiftSortComponent } from "../gift-sort/gift-sort.component";
import { GetCategoryWithGiftsDto } from '../../../Models/category.model';
import { CategoryService } from '../../../Services/CategoryService';
import { RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-gifts-layout',
  standalone: true,
  imports: [SingleGiftComponent, ButtonModule, GiftSortComponent, RouterLink
    ,PaginatorModule, MessageModule],
  templateUrl: './gifts-layout.component.html',
  styleUrl: './gifts-layout.component.scss'
})
export class GiftsLayoutComponent implements OnInit {
  giftService = inject(GiftService);
  private categoryService = inject(CategoryService);
  authService = inject(AuthService);


  gifts = signal<GetGiftDto[]>([]);

  categoriesWithGifts = signal<GetCategoryWithGiftsDto[]>([]);
  selectedSortMethod = signal<string>('');

  totalRecords = signal(0);
  rows = signal(12);
  first = signal(0);
  loading = signal(false);

  ngOnInit(): void {
    this.giftService.checkStatus();
    this.loadPagedGifts();
  }

  loadPagedGifts() {
    this.loading.set(true);
    const pageNumber = (this.first() / this.rows()) + 1;

    this.giftService.getGifts(pageNumber, this.rows()).subscribe({
      next: (response) => {
        this.gifts.set(response.items);
        this.totalRecords.set(response.totalCount);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching gifts:', error);
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.loadPagedGifts();
  }

  handleSortChange(newMethod: string) {
    this.selectedSortMethod.set(newMethod);
    this.first.set(0);

    if (newMethod === 'category') {
      this.sortByCategory();
    } else if (newMethod === 'price') {
      this.sortByPrice();
    } else {
      this.loadPagedGifts();
    }
  }

  sortByCategory() {
    this.loading.set(true);
    this.categoryService.getAllCategoriesWithGifts().subscribe({
      next: (categories) => {
        this.categoriesWithGifts.set(categories);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
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


  handleGiftDeleted(id: number) {
    this.gifts.update(prev => prev.filter(g => g.id !== id));
    this.totalRecords.update(total => total - 1);

    this.categoriesWithGifts.update(categories =>
      categories.map(category => ({
        ...category,
        gifts: category.gifts.filter(g => g.id !== id)
      }))
    );
  }
}