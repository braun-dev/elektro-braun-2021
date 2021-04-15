import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EmployeesFeatureModule } from '@elektro-braun/employees/feature';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeTrackingFeatureModule } from '@elektro-braun/time-tracking/feature';
import { UsersFeatureModule } from '@elektro-braun/users/feature';
import { reducers } from './store/reducers/app.reducer';
import { CustomRouterSerializer, RouterEffects } from '@elektro-braun/shared/util-router-state';
import { registerLocaleData } from '@angular/common';
import deAT from '@angular/common/locales/de-AT';
import { HolidaysDomainModule } from '@elektro-braun/holidays/domain';
import { AuthInterceptor } from '@elektro-braun/shared/util-networking';
import { AuthGuard } from '@elektro-braun/auth/api';
import { AuthFeatureModule } from '@elektro-braun/auth/feature';

registerLocaleData(deAT);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),

    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomRouterSerializer }),

    // Feature Modules
    AuthFeatureModule,
    EmployeesFeatureModule,
    UsersFeatureModule,
    TimeTrackingFeatureModule,

    // Holiday Store init
    HolidaysDomainModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-AT' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
