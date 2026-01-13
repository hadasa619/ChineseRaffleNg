import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddDonorDto, ShowDonor, UpdateDonorDto } from '../../../Models/donor.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DonorService } from '../../../Services/DonorService';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-add-donor',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    CardModule,
    RouterLink,
    MessageModule,
    DropdownModule,
    InputMaskModule,
    InputGroupModule,
    InputGroupAddonModule],
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.scss'
})
export class AddDonorComponent {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    messageService = inject(MessageService);
    private donorService = inject(DonorService);
  
    donorForm!: FormGroup;
    donorId!: number;
    errorMessage: string = '';
    ngOnInit(): void {
      this.donorId = Number(this.route.snapshot.paramMap.get('id'));
      this.initForm();
    }
  
    initForm() {
      this.donorForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9-]{9,11}$/)]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  
  
    onSave() {
      if (this.donorForm.valid) {
        this.errorMessage = '';
        const newDonor: AddDonorDto = this.donorForm.getRawValue();

        this.donorService.addDonor( newDonor).subscribe({
          next: () => {
            this.router.navigate(['/donors']);
          },
          error: (err) => {
            console.error('Add failed', err);
            this.errorMessage = 'Failed to add donor. Please try again.';
          }
        });
      }
    }

}
