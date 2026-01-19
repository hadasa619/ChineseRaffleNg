// raffle-statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RaffleSummaryDto {
    totalRevenue: number;
    totalTicketsSold: number;
    totalDonors: number;
    totalGifts: number;
    popularGifts: { title: string, count: number }[];
}

@Injectable({ providedIn: 'root' })
export class RaffleStatisticsService {
    private readonly apiUrl = `${environment.apiUrl}/Statistics`;

    constructor(private http: HttpClient) { }

    getSummary(): Observable<RaffleSummaryDto> {
        return this.http.get<RaffleSummaryDto>(`${this.apiUrl}/summary`);
    }
}