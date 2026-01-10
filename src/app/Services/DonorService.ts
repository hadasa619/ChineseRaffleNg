import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetDonorDto, AddDonorDto, UpdateDonorDto } from '../Models/donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.serverUrl}/api/Donor`;

  getAllDonors(): Observable<GetDonorDto[]> {
    return this.http.get<GetDonorDto[]>(this.apiUrl);
  }

  getDonorById(id: number): Observable<GetDonorDto> {
    return this.http.get<GetDonorDto>(`${this.apiUrl}/${id}`);
  }

  addDonor(donor: AddDonorDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, donor);
  }

  updateDonor(id: number, donor: UpdateDonorDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, donor);
  }

  deleteDonor(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  getDonorsByName(name: string): Observable<GetDonorDto[]> {
    return this.http.get<GetDonorDto[]>(`${this.apiUrl}/byName/${name}`);
  }

  getDonorsByEmail(email: string): Observable<GetDonorDto[]> {
    return this.http.get<GetDonorDto[]>(`${this.apiUrl}/byEmail/${email}`);
  }

  getDonorByGift(giftId: number): Observable<GetDonorDto> {
    return this.http.get<GetDonorDto>(`${this.apiUrl}/byGift/${giftId}`);
  }

  checkDonorExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${name}`);
  }
}