import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddGiftDto, GetGiftDto, GetGiftWithBuyersDto, UpdateGiftDto } from '../Models/gift.model';

@Injectable({
    providedIn: 'root'
})
export class GiftService {

    private readonly apiUrl = `${environment.apiUrl}/Gift`;
    constructor(private http: HttpClient) { }
    getAllGifts(): Observable<GetGiftDto[]> {
        return this.http.get<GetGiftDto[]>(this.apiUrl);
    }

    getGiftsSortedByCategory(): Observable<GetGiftDto[]> {
        return this.http.get<GetGiftDto[]>(`${this.apiUrl}/sorted/category`);
    }

    getGiftsSortedByPrice(): Observable<GetGiftDto[]> {
        return this.http.get<GetGiftDto[]>(`${this.apiUrl}/sorted/price`);
    }


    getGiftById(id: number): Observable<GetGiftDto> {
        return this.http.get<GetGiftDto>(`${this.apiUrl}/${id}`);
    }
    getGiftsWithBuyers(): Observable<GetGiftWithBuyersDto[]> {
        return this.http.get<GetGiftWithBuyersDto[]>(`${this.apiUrl}/with-buyers`);
    }

    addGift(giftData: AddGiftDto, imageFile?: File): Observable<GetGiftDto> {
        const formData = new FormData();
        Object.entries(giftData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });
        if (imageFile) {
            formData.append('ImageFile', imageFile);
        }
        return this.http.post<GetGiftDto>(this.apiUrl, formData);
    }

    updateGift(id: number, giftData: UpdateGiftDto, imageFile?: File): Observable<void> {
        const formData = new FormData();        
        Object.entries(giftData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });
        if (imageFile) {
            formData.append('ImageFile', imageFile);
        }
        return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
    }

    deleteGift(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
