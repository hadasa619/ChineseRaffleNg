import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { RaffleStatisticsService, RaffleSummaryDto } from '../../../Services/RaffleStatisticsService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private statsService = inject(RaffleStatisticsService);
  
  // סיגנלים למספרים הרצים (אנימציה)
  displayRevenue = signal<number>(0);
  displayTickets = signal<number>(0);
  displayDonors = signal<number>(0);
  displayGifts = signal<number>(0);

  summary = signal<RaffleSummaryDto | null>(null);
  chartData = signal<any>(null);
  chartOptions = signal<any>(null);

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this.statsService.getSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        
        this.prepareChart(data);

        this.animateValue(data.totalRevenue, this.displayRevenue);
        this.animateValue(data.totalTicketsSold, this.displayTickets);
        this.animateValue(data.totalDonors, this.displayDonors);
        this.animateValue(data.totalGifts, this.displayGifts);
      },
      error: (err) => console.error('Error fetching dashboard stats:', err)
    });
  }

  animateValue(target: number, signalRef: any) {
    if (target === 0) return;
    
    let start = 0;
    const duration = 1500; 
    const increment = Math.ceil(target / (duration / 1)); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        signalRef.set(target);
        clearInterval(timer);
      } else {
        signalRef.set(start);
      }
    }, 20);
  }

  prepareChart(data: RaffleSummaryDto) {
    if (!data.popularGifts || data.popularGifts.length === 0) return;

    this.chartData.set({
      labels: data.popularGifts.map(g => g.title),
      datasets: [
        {
          data: data.popularGifts.map(g => g.count),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EF5350'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#BA68C8', '#E57373']
        }
      ]
    });

    this.chartOptions.set({
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, color: '#495057' }
        }
      },
      maintainAspectRatio: false
    });
  }
}