import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './infrastructure/auth.service';
import { AuthFacade } from './application/auth.facade';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private authFacade: AuthFacade) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.canNavigate();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canNavigate();
  }

  private canNavigate(): Observable<boolean> {
    return this.checkStore().pipe(
      map(() => this.authService.hasValidToken()),
      switchMap(isValid => of(isValid)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.authFacade.isAuthenticated$.pipe(
      filter(o => o),
      take(1)
    )
  }
}
