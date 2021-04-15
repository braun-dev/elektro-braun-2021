import { animateChild, AnimationReferenceMetadata, group, query, useAnimation } from '@angular/animations';

export function useAnimationIncludingChildren(
  animation: AnimationReferenceMetadata,
  options?: { animateChildren?: 'together' | 'after' | 'before'; }
) {
  return [
    ...(options && options.animateChildren === 'before' ? [query('@*', animateChild(), { optional: true })] : []),
    group([
      useAnimation(animation),
      ...(!options || !options.animateChildren || options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : [])
    ]),
    ...(options && options.animateChildren === 'after' ? [query('@*', animateChild(), { optional: true })] : [])
  ];
}
