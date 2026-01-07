import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  AddCategoryDto, 
  GetCategoryDto, 
  GetCategoryWithGiftsDto, 
  UpdateCategoryDto 
} from '../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Category`;

  getAllCategories(): Observable<GetCategoryDto[]> {
    return this.http.get<GetCategoryDto[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<GetCategoryDto> {
    return this.http.get<GetCategoryDto>(`${this.apiUrl}/${id}`);
  }

  getCategoryWithGifts(id: number): Observable<GetCategoryWithGiftsDto> {
    return this.http.get<GetCategoryWithGiftsDto>(`${this.apiUrl}/${id}/gifts`);
  }

  getAllCategoriesWithGifts(): Observable<GetCategoryWithGiftsDto[]> {
    return this.http.get<GetCategoryWithGiftsDto[]>(`${this.apiUrl}/gifts`);
  }

  addCategory(category: AddCategoryDto): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }

  updateCategory(id: number, category: UpdateCategoryDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}