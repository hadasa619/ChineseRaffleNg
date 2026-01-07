import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router); 

  const excludedUrls = ['/api/Auth/login', '/api/Auth/register'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  let authReq = req;
  if (token && !isExcluded) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token expired or unauthorized. Redirecting to login...');        
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 

        router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      }
      return throwError(() => error);
    })
  );
};