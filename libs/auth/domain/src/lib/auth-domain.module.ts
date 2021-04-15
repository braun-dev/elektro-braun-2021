import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthDomainModule {}
