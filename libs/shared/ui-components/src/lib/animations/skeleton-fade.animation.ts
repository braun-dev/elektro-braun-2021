import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

export interface SkeletonFadeAnimationProps {
  duration?: number;
  delay?: number;
}

export const skeletonFadeAnimation = ({ duration = 900, delay = 50 }: SkeletonFadeAnimationProps): AnimationTriggerMetadata => {
  return trigger('fade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-7px)' }),
      animate('{{duration}}ms {{delay}}ms ease-in', keyframes([
        style({ opacity: 0.66, transform: '*', offset: 0.66 }),
        style({ opacity: 1, transform: '*', offset: 1 })
      ]))
    ], { params: { duration, delay } }),
    transition(':leave', [
      animate('100ms ease-out', style({ opacity: 0, transform: 'translateY(9px)' }))
    ])
  ])
}
