import { Component, inject, signal } from '@angular/core';
import { GetDonorDto, ShowDonor } from '../../../Models/donor.model';
import { AuthService } from '../../../Services/AuthService';
import { DonorService } from '../../../Services/DonorService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-donors-layout',
  standalone: true,
  imports: [TableModule, ButtonModule, OverlayPanelModule, InputTextModule, TooltipModule, RouterLink, ToastModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './donors-layout.component.html',
  styleUrl: './donors-layout.component.scss'
})
export class DonorsLayoutComponent {
  donors = signal<GetDonorDto[]>([]);
  totalCount = signal(0);
  loading = signal(false);
  rows = signal(10);
  first = signal(0);

  authService = inject(AuthService);
  private donorService = inject(DonorService);
  messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  selectedDonorId = signal<number | null>(null);
  filteredDonors = signal<GetDonorDto[] | null>(null);

  ngOnInit(): void {
    this.loadDonors();
  }

  loadDonors(event?: any) {
    this.loading.set(true);

    const page = event ? (event.first / event.rows) + 1 : 1;
    const size = event ? event.rows : this.rows();

    this.donorService.getAllDonors(page, size).subscribe({
      next: (response) => {
        console.log('התגובה מהשרת:', response);
        this.donors.set(response.items);
        this.totalCount.set(response.totalCount);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
  onDonorSelect(event: any) {
    const id = event.value;

    this.selectedDonorId.set(id);
    if (!this.selectedDonorId()) {
      this.filteredDonors.set(this.donors());
    } else {
      const result = this.donors().filter(d => d.id === this.selectedDonorId());
      this.filteredDonors.set(result);
    }
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.loadDonors(event);
  }

  deleteDonor(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this donor?',
      header: 'Delete Donor',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.donorService.deleteDonor(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Donor deleted' });
            this.loadDonors();
          },
          error: (err) => {
            console.error('Error deleting donor', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete donor' });
          }
        });
      }
    });
  }
}