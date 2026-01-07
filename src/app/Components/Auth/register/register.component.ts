import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../Services/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule,
    ToastModule,
    RouterModule    
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;


  registerForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
  });
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.formSubmitted));
  }
  onSubmit(): void {
    this.formSubmitted = true;
    this.errorMessage = '';

    if (this.registerForm.valid) {
      this.isLoading = true;

      const registerData = this.registerForm.getRawValue();

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Server Error';
        }
      });
    }
  }
}