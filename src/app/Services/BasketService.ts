import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {  AddBasketDto, GetBasketDto, UpdateBasketDto } from '../Models/basket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = `${environment.apiUrl}/basket`;

  constructor(private http: HttpClient) { }

  isSidebarVisible = signal(false);

  openSidebar() {
    this.isSidebarVisible.set(true);
  }

  toggleSidebar() {
    this.isSidebarVisible.update(value => !value);
  }

  private basketItemsSubject = new BehaviorSubject<GetBasketDto[]>([]);
  
  basketItems$ = this.basketItemsSubject.asObservable();

  loadBasket(): void {
    this.http.get<GetBasketDto[]>(`${this.apiUrl}/myBasket`).subscribe({
      next: (items) => this.basketItemsSubject.next(items),
      error: (err) => console.error('Failed to load basket', err)
    });
  }

  getMyBasket(): Observable<GetBasketDto[]> {
    return this.http.get<GetBasketDto[]>(`${this.apiUrl}/myBasket`);
  }

addToBasket(dto: AddBasketDto): Observable<any> {
    return this.http.post(this.apiUrl, dto).pipe(
      tap(() => this.loadBasket()) 
    );
  }

  deleteBasket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadBasket())
    );
  }

  updateBasket(id: number, dto: UpdateBasketDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto).pipe(
      tap(() => this.loadBasket())
    );
  }
  buyTickets():  Observable<any> {
     return this.http.post(`${this.apiUrl}/buy`, {}).pipe(
      tap(() => this.loadBasket())
    );
}}