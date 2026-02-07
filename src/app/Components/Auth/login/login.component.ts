import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/AuthService';
import { BasketService } from '../../../Services/BasketService';


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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private basketService = inject(BasketService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  token = localStorage.getItem('token');
  messageService = inject(MessageService)


  isLoading: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  loginForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['sessionExpired']) {
      this.errorMessage = 'Your session has expired. Please log in again to continue.';
    }
    this.loginForm.valueChanges.subscribe(() => {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  });
    });
  }
  showSessionExpiredMessage() {
    this.messageService.add({
      severity: 'warn', 
      summary: 'Session Expired', 
      detail: 'Your session has timed out. Please log in again to continue.',
      sticky: true
    });
  }

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
          this.basketService.loadBasket();
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Server Error';       
        }
      });
    }
  }
}

