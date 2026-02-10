import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RaffleService } from '../../../Services/RaffleService';
import { AuthService } from '../../../Services/AuthService';
import confetti from 'canvas-confetti';
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule, CardModule,
    ButtonModule, RouterModule,
    ConfirmDialogModule, MessageModule,
    ToastModule, DialogModule,
    DashboardComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'

})
export class HomeLayoutComponent {
  stats = [
    { label: 'Total Sales', value: '₪ 12,450', icon: 'pi-money-bill', color: '#10b981' },
    { label: 'Tickets Sold', value: '142', icon: 'pi-ticket', color: '#3b82f6' },
    { label: 'Donors', value: '28', icon: 'pi-users', color: '#f59e0b' },
    { label: 'Gifts', value: '15', icon: 'pi-gift', color: '#8b5cf6' }
  ];
  private confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  private raffleService = inject(RaffleService);
  authService = inject(AuthService);

  showSuccessDialog: boolean = false;

  confirmRaffle() {
    this.confirmationService.confirm({
      key: 'adminRaffleKey',
      message: 'Are you sure you want to finalize the raffle and download the results?',
      header: 'Grand Raffle Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, Draw Now!',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.runRaffleProcess();
      }
    });
  }
  // private launchConfetti() {
  //   confetti({
  //     particleCount: 1000,
  //     spread: 1500,
  //     origin: { y: 0.2, x: 0.5 },
  //     colors: ['#10b981', '#fbbf24', '#3b82f6', '#ffffff']
  //   });
  // }
  private fireConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#fbbf24','#3b82f6', '#ff1111']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#ff1111', '#10b981', '#fbbf24']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
}

  private runRaffleProcess() {
    this.raffleService.downloadRaffleResults().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'raffle-results.zip';
        a.click();
        window.URL.revokeObjectURL(url);
        this.showSuccessDialog = true;
        this.fireConfetti();

        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Raffle completed and file downloaded.'
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate raffle file.'
        });
      }
    });

  }
}


