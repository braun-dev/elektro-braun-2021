import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponse } from '../entities/auth-response';
import { NetworkingService } from '@elektro-braun/shared/util-networking';
import { map } from 'rxjs/operators';
import { AuthRequest } from '../entities/auth-request';
import { AUTH_PATH } from '../auth-domain.api';
import { User } from '@elektro-braun/users/domain';

const TOKEN_KEY = 'JWT_TOKEN';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private jwtHelper: JwtHelperService;

  constructor(private store: Store, private networkingService: NetworkingService) {
    this.jwtHelper = new JwtHelperService();
  }

  authenticate(email: string, password: string): Observable<AuthResponse> {
    return this.networkingService.post<AuthResponse, AuthRequest>(AUTH_PATH, { email, password }).pipe(
      map(response => response.data)
    );
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token || token.length < 1) {
      return false
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserAndToken(): { user: User, token: string } {
    const token = this.getToken();
    const { user } = this.jwtHelper.decodeToken<{ user: User }>(token);
    return {
      user,
      token
    }
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
