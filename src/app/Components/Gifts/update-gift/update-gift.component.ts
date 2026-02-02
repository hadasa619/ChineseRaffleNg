import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GiftService } from '../../../Services/GiftService';
import { GetGiftDto, UpdateGiftDto } from '../../../Models/gift.model';
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
  selector: 'app-update-gift',
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
  templateUrl: './update-gift.component.html',
  styleUrl: './update-gift.component.scss'
})
export class UpdateGiftComponent implements OnInit {
  private fb = inject(FormBuilder);
  private giftService = inject(GiftService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  messageService = inject(MessageService);
  private donorService = inject(DonorService);
  private categoryService = inject(CategoryService);

  giftForm!: FormGroup;
  giftId!: number;
  currentImageUrl: string | null = null;
  selectedFile: File | null = null;
  errorMessage: string = '';
  previewUrl: string | null = null; 
  donorsList = signal<ShowDonor[]>([]);
  categoriesList = signal<GetCategoryDto[]>([]);

  ngOnInit(): void {
    this.giftId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadDonors();
  }

  initForm() {
    this.giftForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ticketPrice: ['', [Validators.required]],
      donorId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }

  loadGiftData() {
    this.giftService.getGiftById(this.giftId).subscribe({
      next: (gift: GetGiftDto) => {
        console.log('Server response:', gift);
        this.giftForm.patchValue(gift);
        this.currentImageUrl = gift.image;
      },
      error: (err) => console.error('Error loading gift', err)
    });
  }
loadDonors() {
  this.donorService.getAllDonors(1, 1000).subscribe({
    next: (data) => {
      this.donorsList.set(data.items.map(d => ({ id: d.id, name: d.name })));
      this.loadCategories();
    },
    error: (err) => console.error('Failed to load donors', err)
  });
}
    loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categoriesList.set(data);
        this.loadGiftData();
      },
      error: (err) => console.error('Failed to load categories', err)
    });
  }
  

  getPreviewUrl(): string {
    if (this.previewUrl) {
      return this.previewUrl;
    }
    if (!this.currentImageUrl) {
      return 'assets/images/default-gift.png';
    }
    if (this.currentImageUrl.startsWith('http') || this.currentImageUrl.startsWith('data:image')) {
      return this.currentImageUrl;
    }
    return `${environment.serverUrl}/${this.currentImageUrl}`;
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
      const updatedGift: UpdateGiftDto = this.giftForm.getRawValue();

      this.giftService.updateGift(this.giftId, updatedGift, this.selectedFile || undefined).subscribe({
        next: () => {
          this.router.navigate(['/gifts']);
        },
        error: (err) => {
          console.error('Update failed', err);
          this.errorMessage = 'Failed to update gift. Please try again.';
        }
      });
    }
  }
} 

