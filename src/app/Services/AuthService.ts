import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequestDto, LoginResponseDto } from '../Models/auth.model';
import { AddUserDto, GetUserDto } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`;
  currentUserRole = signal<'Admin' | 'User' | null>(null);
  constructor(private http: HttpClient) 
  {
    const savedRole = localStorage.getItem('userRole') as 'Admin' | 'User';
    if (savedRole) {
      this.currentUserRole.set(savedRole);
    }
  }

login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setSession(response);
        
        this.currentUserRole.set(response.user.role.toString() as 'Admin' | 'User');
        console.log(this.isAdmin());
        
        localStorage.setItem('userRole', response.user.role.toString());
      })
    );
  }

  register(userData: AddUserDto): Observable<GetUserDto> {
    return this.http.post<GetUserDto>(`${this.apiUrl}/register`, userData);
  }

  private setSession(authResult: LoginResponseDto) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getCurrentUser(): GetUserDto | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  isAdmin = computed(() => this.currentUserRole() === 'Admin');
}