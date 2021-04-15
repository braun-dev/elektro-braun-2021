import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './+state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UsersDomainModule {}
