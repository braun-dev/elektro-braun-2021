import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private static getToken(): string {
    return localStorage.getItem('JWT_TOKEN');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = AuthInterceptor.getToken();
    if (!token)
      return next.handle(req);

    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const clonedReq = req.clone({ headers });
    return next.handle(clonedReq);
  }
}
