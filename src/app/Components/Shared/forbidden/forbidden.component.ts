import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  template: `
    <div class="flex align-items-center justify-content-center h-screen">
      <div class="surface-card p-6 border-round shadow-2 text-center w-full md:w-6">
        <h1 class="text-6xl font-bold text-900 mb-2">403</h1>
        <p class="text-xl text-600 mb-4">Forbidden — you don't have permission to access this page.</p>
        <div class="flex gap-2 justify-content-center">
          <a routerLink="/" class="p-button p-component p-button-outlined">Home</a>
          <a routerLink="/login" class="p-button p-component p-button-primary">Login</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ForbiddenComponent {}
