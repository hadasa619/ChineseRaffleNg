import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  AddBasketDto, GetBasketDto, UpdateBasketDto } from '../Models/basket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = `${environment.apiUrl}/basket`;

  constructor(private http: HttpClient) { }

  getMyBasket(): Observable<GetBasketDto[]> {
    return this.http.get<GetBasketDto[]>(`${this.apiUrl}/myBasket`);
  }

  addToBasket(basketDto: AddBasketDto): Observable<any> {
    return this.http.post(this.apiUrl, basketDto);
  }

  updateBasket(id: number, updateDto: UpdateBasketDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updateDto);
  }

  deleteBasket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}