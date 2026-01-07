import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GiftService } from '../../../Services/GiftService';
import { GetGiftDto, UpdateGiftDto } from '../../../Models/gift.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../environments/environment';

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
    RouterLink
  ],
  templateUrl: './update-gift.component.html',
  styleUrl: './update-gift.component.scss'
})
export class UpdateGiftComponent implements OnInit {
  private fb = inject(FormBuilder);
  private giftService = inject(GiftService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  giftForm!: FormGroup;
  giftId!: number;
  currentImageUrl: string | null = null;

getPreviewUrl(): string {
  if (!this.currentImageUrl) {
    return 'assets/images/default-gift.png';
  }
  if (this.currentImageUrl.startsWith('http') || this.currentImageUrl.startsWith('data:image')) {
    return this.currentImageUrl;
  }
  return `${environment.serverUrl}/${this.currentImageUrl}`;
}

  ngOnInit(): void {
    this.giftId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadGiftData();
  }

  initForm() {
    this.giftForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ticketPrice: ['', [Validators.required]],
    });
  }

  loadGiftData() {
    this.giftService.getGiftById(this.giftId).subscribe({
      next: (gift: GetGiftDto) => {
        this.giftForm.patchValue(gift);
        this.currentImageUrl = gift.image;
        console.log(this.currentImageUrl);
      },
      error: (err) => console.error('Error loading gift', err)
    });
  }

  onSave() {
    if (this.giftForm.valid) {
      const updatedGift: UpdateGiftDto = this.giftForm.value;
      console.log(updatedGift+"aaa");
      this.giftService.updateGift(this.giftId, updatedGift).subscribe({
        next: () => {
          this.router.navigate(['/gifts']);
        },
        error: (err) => console.error('Update failed', err)
      });
    }
  }

  updatePreview() {
    this.currentImageUrl = this.giftForm.get('imageUrl')?.value;
  }
}
