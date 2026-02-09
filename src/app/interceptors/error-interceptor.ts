import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  let detailMessage = '';
  const router = inject(Router);
  return next(req).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      // Error message details
      switch (errorResponse.status) {
        case 0:
          detailMessage = errorResponse.status + ' : Cannot access server';
          router.navigate(['/login']);
          break;
        case 400:
          detailMessage = errorResponse.status + ' : Bad request';
          break;
        case 401:
          detailMessage = errorResponse.status + ' : Unauthorized';
          router.navigate(['/login']);
          break;
        case 402:
          detailMessage = errorResponse.status + ' : Access denied';
          break;
        case 404:
          detailMessage = errorResponse.status + ' : Not Found';
          break;
        default:
          detailMessage = 'Unknown error';
          break;
      }

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: detailMessage,
      });
      return throwError(() => errorResponse);
    }),
  );
};
