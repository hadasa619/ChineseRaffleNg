import { Component, inject, signal } from '@angular/core';
import { GetDonorDto } from '../../../Models/donor.model';
import { AuthService } from '../../../Services/AuthService';
import { DonorService } from '../../../Services/DonorService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-donors-layout',
  standalone: true,
  imports: [TableModule, ButtonModule, OverlayPanelModule, InputTextModule, TooltipModule, RouterLink, ToastModule],
  templateUrl: './donors-layout.component.html',
  styleUrl: './donors-layout.component.scss'
})
export class DonorsLayoutComponent {
  donors = signal<GetDonorDto[]>([]);
  authService = inject(AuthService);
  private donorService = inject(DonorService);
  messageService = inject(MessageService);


  ngOnInit(): void {
    this.donorService.getAllDonors().subscribe({
      next: (donors) => {
        this.donors.set(donors);
        console.log('Donors retrieved:', donors);
      },
      error: (error) => {
        console.error('Error fetching donors:', error);
      }
    });
  }
  deleteDonor(id: number) {
    if (confirm('Are you sure you want to delete this donor?')) {
      this.donorService.deleteDonor(id).subscribe({
        next: (res) => {
          this.donors.update(prev => prev.filter(d => d.id !== id));
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: `Donor ${id} deleted successfully` });
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Delete failed';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      });
    }
  }
}
