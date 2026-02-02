import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GiftService } from '../../../Services/GiftService';
import { AddGiftDto } from '../../../Models/gift.model';
import { ShowDonor } from '../../../Models/donor.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DonorService } from '../../../Services/DonorService';  
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../Services/CategoryService';
import { GetCategoryDto } from '../../../Models/category.model';

@Component({
  selector: 'app-add-gift',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    CardModule,
    RouterLink,
    MessageModule,
    DropdownModule
  ],
  templateUrl: './add-gift.component.html',
  styleUrl: './add-gift.component.scss'
})
export class AddGiftComponent implements OnInit {
  private fb = inject(FormBuilder);
  private giftService = inject(GiftService);
  private router = inject(Router);
  private donorService = inject(DonorService);
  private categoryService = inject(CategoryService);
  messageService = inject(MessageService);

  giftForm!: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';
  previewUrl: string | null = null; 
  
  donorsList = signal<ShowDonor[]>([]);
  categoriesList = signal<GetCategoryDto[]>([]);
  loadingData = signal(false);

  ngOnInit(): void {
    this.initForm();
    this.loadInitialData();
  }

  initForm() {
    this.giftForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ticketPrice: [null, [Validators.required, Validators.min(1)]],
      donorId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  // טעינת כל הנתונים הנדרשים לטופס
  loadInitialData() {
    this.loadingData.set(true);
    
    // טעינת תורמים - מבקשים כמות גדולה כדי שיופיעו ב-Dropdown
    this.donorService.getAllDonors(1, 1000).subscribe({
      next: (response) => {
        // מחלצים את המערך מתוך response.items
        this.donorsList.set(response.items.map(d => ({ id: d.id, name: d.name })));
        
        // לאחר הצלחה טוענים קטגוריות
        this.loadCategories();
      },
      error: (err) => {
        console.error('Failed to load donors', err);
        this.loadingData.set(false);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        // התאמה למקרה שהקטגוריות גם עברו לפגינציה
        const categories = data.items ? data.items : data;
        this.categoriesList.set(categories);
        this.loadingData.set(false);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loadingData.set(false);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.giftForm.valid) {
      this.errorMessage = '';
      const newGift: AddGiftDto = this.giftForm.getRawValue();

      this.giftService.addGift(newGift, this.selectedFile || undefined).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gift added successfully' });
          this.router.navigate(['/gifts']);
        },
        error: (err) => {
          console.error('Add failed', err);
          this.errorMessage = 'Failed to add gift. Please try again.';
        }
      });
    } else {
      this.giftForm.markAllAsTouched();
    }
  }

  getPreviewUrl(): string {
    return this.previewUrl || 'assets/images/default-gift.png';
  }
}