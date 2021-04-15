import {
  animate,
  animation,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';
import { useAnimationIncludingChildren } from './utils';

const DEFAULT_DURATION = 200;

interface FadeInDownAnimationOptions {
  anchor?: string; // name
  delay?: number;
  duration?: number;
  translate: string;
  childAnimationOptions?: { animateChildren?: 'together' | 'after' | 'before'; }
}

const fadeInDown = () => animation([
  animate(
    '{{duration}}ms {{delay}}ms',
    keyframes([
      style({ visibility: 'visible', opacity: 0, transform: 'translate3d(0, -{{translate}}, 0)', easing: 'ease', offset: 0 }),
      style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
    ])
  )
]);

export function fadeInDownAnimation(options?: FadeInDownAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInDown', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(fadeInDown(), options.childAnimationOptions)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}

export function fadeInDownOnEnterAnimation(options?: FadeInDownAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'fadeInDownOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(fadeInDown(), options.childAnimationOptions)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}
