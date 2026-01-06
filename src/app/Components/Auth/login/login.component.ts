import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule,
    ToastModule,
    RouterModule
  ],
  providers: [MessageService], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  loginForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.formSubmitted));
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.errorMessage = '';   

    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const loginData = this.loginForm.getRawValue();

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/gifts']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Server Error';       
        }
      });
    }
  }
}

