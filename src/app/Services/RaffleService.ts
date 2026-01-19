import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RaffleService {

    private readonly apiUrl = `${environment.apiUrl}/Raffle`;
    constructor(private http: HttpClient) { }

    downloadRaffleResults() {
        return this.http.get(`${this.apiUrl}/download-raffle-zip`, {
            responseType: 'blob'
        });
    }
}